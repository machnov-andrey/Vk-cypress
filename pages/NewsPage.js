import Button from "../framework/elements/Button";
import Label from "../framework/elements/Label";
import BasePage from "./base/BasePage";


export default class NewsPage extends BasePage {

    #MyPageButton = new Button("#l_pr", "Кнопка 'Моя страница'");

    constructor() {
        super(new Label("#feed_rmenu", "Боковое меню в новостях"), "Новости");
    }

    clickMyPageButton() {
        this.#MyPageButton.click();
    }
}