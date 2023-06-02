import Button from "../../framework/elements/Button";
import Label from "../../framework/elements/Label";
import CypressUtil from "../../utils/CypressUtil";
import BaseForm from "../base/BaseForm";

export default class PostForm extends BaseForm {


    _contentTextLabel = new Label(".wall_post_text", "Post text", this._baseElement);
    _authorFullNameLabel = new Label(".PostHeaderTitle__authorName, a.author", "Author full name", this._baseElement);
    
    #likeButton = new Button("div.PostButtonReactions", "Like button", this._baseElement);
    #unlikeButton = new Button("[aria-label='Убрать реакцию «Нравится»']", "Unlike button", this._baseElement);
    #showNextCommentButton = new Button(".js-replies_next_label", "Show next comment button", this._baseElement);

    #attachmentLocator = "a[aria-label='фотография']";
    #locatorComment = "div[data-post-id]";

    constructor(locator, name) {
        super(locator, name);
    }

    clickShowNextCommentButton() {
        this.#showNextCommentButton.click();
    }

    isDisplayedShowNextCommentButton(aliasReturn) {
        this.#showNextCommentButton.isDisplayed(aliasReturn);
    }

    isDisplayedUnlikeButton(aliasReturn) {
        this.#unlikeButton.isDisplayed(aliasReturn);
    }

    getAllPostComments(aliasReturn) {
        let commentsArray = [];
        this._baseElement._findElement().find(this.#locatorComment).then(commentsElements => {
            for (let commentElement of commentsElements) {
                commentsArray.push(new CommentForm(`#${commentElement.id}`, `Comment ${commentElement.id}`))
            }

            CypressUtil.wrap_alias(commentsArray, aliasReturn);
        });
    }

    getTextContent(aliasReturn) {
        this._contentTextLabel.getText(aliasReturn);
    }

    getAuthorFullName(aliasReturn) {
        this._authorFullNameLabel.getText(aliasReturn);
    }

    getAttachmentId(aliasReturn) {
        this._baseElement._findElement().find(this.#attachmentLocator).invoke('attr', 'href').as(aliasReturn);
    }

    clickLike() {
        this.#likeButton.click();
    }
}

export class CommentForm extends PostForm {

    _contentTextLabel = new Label(".wall_reply_text", "Comment text", this._baseElement);
    _authorFullNameLabel = new Label(".author", "Author full name", this._baseElement);
}