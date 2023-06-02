import Button from "../../framework/elements/Button";
import CypressUtil from "../../utils/CypressUtil";
import BaseForm from "../base/BaseForm";
import PostForm from "./PostForm";


export default class WallForm extends BaseForm {

    #wallPostLocator = "div[data-post-id]";
    #moreWallPostButton = new Button("#wall_more_link", "К предыдущим записям");

    constructor() {
        super("#profile_wall", "Wall post form");
    }

    getAllDisplayedPosts(aliasReturn) {
        let postsArray = [];
        this._baseElement._findElement().find(this.#wallPostLocator).then(postsElements => {
            for (let postElement of postsElements) {
                postsArray.push(new PostForm(`#${postElement.id}`, `Post ${postElement.id}`))
            }

            CypressUtil.get(postsArray, aliasReturn);
        });
    }

    getPostByTextContent(textContent, aliasReturn) {
        CypressUtil.get(`div[id^='post'][data-post-id]:contains('${textContent}')`).its(0).then(elem => {
            CypressUtil.wrap_alias(new PostForm(`#${elem.id}`, `Post ${elem.id}`), aliasReturn);
        });
    }

    clickMoreWallPostButton() {
        this.#moreWallPostButton.click();
    }
}