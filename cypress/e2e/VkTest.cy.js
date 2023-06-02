import VkObjectsTypes from "../../enums/VkObjectsTypes.js";
import NewsPage from "../../pages/NewsPage.js";
import ProfilePage from "../../pages/profile_page/ProfilePage.js";
import VkIdEnterPasswordPage from "../../pages/VkIdEnterPasswordPage.js";
import WelcomePage from "../../pages/WelcomePage.js";
import Config from "../../resources/Config.js";
import TestData from "../../resources/testData.js";
import AssertUtil from "../../utils/AssertUtil.js";
import CypressUtil from "../../utils/CypressUtil.js";
import HttpUtil from "../../utils/HttpUtil.js";
import LogUtil from "../../utils/LogUtil.js";
import RandomUtil from "../../utils/RandomUtil.js";
import VkApiUtil from "../../utils/VkApiUtil.js";

const PICTURE_NAME = "picture.png";

describe('Vk test', () => {
	beforeEach(() => {
		LogUtil.log(`[UI] Перейти на сайт '${Config.vkUrl}'`);
		CypressUtil.visit(Config.vkUrl);
	})

	it('check API', () => {
		LogUtil.log("[API] Получаем информацию о владельце страницы");
		const responseUsersGetAlias = "responseUsersGet";
		VkApiUtil.usersGet(responseUsersGetAlias, Config.token, Config.apiVersion);

		const ownerIdAlias = "ownerId";
		const fullNameAlias = "fullName";
		CypressUtil.get_alias(responseUsersGetAlias).then(response => {
			CypressUtil.wrap_alias(response.body.response[0].id, ownerIdAlias);
			CypressUtil.wrap_alias(`${response.body.response[0].first_name} ${response.body.response[0].last_name}`, fullNameAlias);
		});

		LogUtil.log("[UI] Авторизоваться");
		const welcomePage = new WelcomePage();
		welcomePage.typePhoneOrEmail(TestData.login);
		welcomePage.clickSignInButton();

		const vkIdEnterPassword = new VkIdEnterPasswordPage();
		vkIdEnterPassword.isOpened();
		vkIdEnterPassword.typePassword(TestData.password);
		vkIdEnterPassword.clickContinue();

		LogUtil.log("[UI] Перейти на 'Мою страницу'");
		const newsPage = new NewsPage();
		newsPage.clickMyPageButton();
		const profilePage = new ProfilePage();

		LogUtil.log("[API] С помощью запроса к API создать запись со случайно сгенерированным текстом на стене и получить id записи из ответа.");
		const randomMessage = RandomUtil.getRandomString();
		const responseWallPostAlias = "responseWallPost";
		const newPostIdAlias = "newPostId";
		VkApiUtil.wallPost(responseWallPostAlias, Config.token, Config.apiVersion, randomMessage);
		CypressUtil.get_alias(responseWallPostAlias).then(response => {
			CypressUtil.wrap_alias(response.body.response.post_id, newPostIdAlias);
		});

		LogUtil.log("[UI] Не обновляя страницу убедиться, что на стене появилась запись с нужным текстом от правильного пользователя.")
		const postAlias = "post";
		profilePage.wallForm.getPostByTextContent(randomMessage, postAlias);

		const textPostAlias = "textPost";
		const authorPostAlias = "authorPost";
		CypressUtil.get_alias(postAlias).then(posts => {
			posts.getTextContent(textPostAlias);
			posts.getAuthorFullName(authorPostAlias);
		});

		AssertUtil.assertEqualsLeftAlias(textPostAlias, randomMessage, "Текст записи");
		AssertUtil.assertEqualsBothAlias(authorPostAlias, fullNameAlias, "Автор записи");

		LogUtil.log("[API] Отредактировать запись через запрос к API - изменить текст и добавить (загрузить) любую картинку.");

		const responseApiUploadServerAlias = "responseApiUploadServer";
		const serverUploadAlias = "serverUpload";
		VkApiUtil.photosGetWallUploadServer(responseApiUploadServerAlias, Config.token, Config.apiVersion);

		cy.fixture(PICTURE_NAME, 'binary').then(file => {
			const blob = Cypress.Blob.binaryStringToBlob(file);
			const formdata = new FormData();
			formdata.set("photo", blob, PICTURE_NAME);

			CypressUtil.get_alias(responseApiUploadServerAlias).then(response => {
				HttpUtil.post(response.body.response.upload_url, formdata).then(response => {
					CypressUtil.wrap_alias(JSON.parse(new TextDecoder().decode(response.body)), serverUploadAlias);
				})
			});
		});

		const responsePhotosSaveWallPhotoAlias = "responsePhotosSaveWallPhoto";
		CypressUtil.get_alias(serverUploadAlias).then(serverUploadAlias => {
			VkApiUtil.photosSaveWallPhoto(responsePhotosSaveWallPhotoAlias, Config.token, Config.apiVersion,
				serverUploadAlias.photo, serverUploadAlias.server, serverUploadAlias.hash);
		})

		const responseWallEditAlias = "responseWallEdit";
		const newRandomMessage = RandomUtil.getRandomString();
		CypressUtil.get_alias(responsePhotosSaveWallPhotoAlias).then(response => {

			CypressUtil.get_alias(newPostIdAlias).then(postId => {

				VkApiUtil.wallEdit(responseWallEditAlias, Config.token, Config.apiVersion, postId, newRandomMessage,
					`photo${response.body.response[0].owner_id}_${response.body.response[0].id}`)
			})
		})

		LogUtil.log("[UI] Не обновляя страницу убедиться, что изменился текст сообщения и добавилась загруженная картинка(убедиться, что картинки одинаковые).");

		const attachmentImageAlias = "attachmentImage";
		CypressUtil.get_alias(postAlias).then(posts => {
			posts.getAttachmentId(attachmentImageAlias);
			posts.getTextContent(textPostAlias);
		});

		CypressUtil.get_alias(responsePhotosSaveWallPhotoAlias).then(responseSavePhoto => {
			CypressUtil.get_alias(attachmentImageAlias).should('equal',
				`/photo${responseSavePhoto.body.response[0].owner_id}_${responseSavePhoto.body.response[0].id}`,
				"Путь прикреплённой картинки к записи");
		});

		AssertUtil.assertEqualsLeftAlias(textPostAlias, newRandomMessage, "Изменённый текст записи");

		LogUtil.log("[API] Используя запрос к API добавить комментарий к записи со случайным текстом.");
		const responseWallCreateCommentAlias = "responseWallCreateComment";
		const randomComment = RandomUtil.getRandomString();
		CypressUtil.get_alias(newPostIdAlias).then(postId => {
			VkApiUtil.wallCreateComment(responseWallCreateCommentAlias, Config.token, Config.apiVersion, postId, randomComment);
		});

		LogUtil.log("[UI] Не обновляя страницу убедиться, что к нужной записи добавился комментарий от правильного пользователя.");
		const commentTextAlias = "commentText";
		const authorCommentAlias = "authorComment";
		const allCommentsAlias = "allComments";
		const isDisplayedShowCommentAlias = "isDisplayedShowComment";
		CypressUtil.get_alias(postAlias).then(post => {

			post.isDisplayedShowNextCommentButton(isDisplayedShowCommentAlias);

			CypressUtil.get_alias(isDisplayedShowCommentAlias).then(isDisplayedShowComment => {

				if (isDisplayedShowComment) {
					post.clickShowNextCommentButton();
				}

				post.getAllPostComments(allCommentsAlias);

				CypressUtil.get_alias(allCommentsAlias).its(0).then(comment => {
					comment.getTextContent(commentTextAlias);
					comment.getAuthorFullName(authorCommentAlias);
				});
			});
		});

		AssertUtil.assertEqualsLeftAlias(commentTextAlias, randomComment, "Текст комментария");
		AssertUtil.assertEqualsBothAlias(fullNameAlias, authorCommentAlias, "Автор комментария");

		LogUtil.log("[UI] Через UI оставить лайк к записи.");
		CypressUtil.get_alias(postAlias).then(post => {
			post.clickLike();
			post.isDisplayedUnlikeButton("unlike button");
		});

		LogUtil.log("[API] Через запрос к API убедиться, что у записи появился лайк от правильного пользователя.");
		const responseGetLikesAlias = "responseGetLikes";
		CypressUtil.get_alias(newPostIdAlias).then(postId => {
			VkApiUtil.likesGetList(responseGetLikesAlias, Config.token, Config.apiVersion, VkObjectsTypes.POST, postId);
		});

		CypressUtil.get_alias(responseGetLikesAlias).then(responseGetLikes => {
			CypressUtil.get_alias(ownerIdAlias).then(ownerId => {
				CypressUtil.return_wrap(responseGetLikes.body.response.items[0]).should('equal', ownerId,
					"Id пользователя, который поставил лайк");
			});
		});

		LogUtil.log("[API] Через запрос к API удалить созданную запись.");
		const responseWallDeleteAlias = "responseWallDelete";
		CypressUtil.get_alias(newPostIdAlias).then(postId => {
			VkApiUtil.wallDelete(responseWallDeleteAlias, Config.token, Config.apiVersion, postId);
		});

		LogUtil.log("[UI] Не обновляя страницу убедиться, что запись удалена.");
		const isDisplayedPostAlias = "isDisplayedPostAlias";

		CypressUtil.get_alias(postAlias).then(post => {
			post.isOpened(isDisplayedPostAlias);
		});

		AssertUtil.assertEqualsLeftAlias(isDisplayedPostAlias, false, "Наличие записи, после удаления");
	})
})