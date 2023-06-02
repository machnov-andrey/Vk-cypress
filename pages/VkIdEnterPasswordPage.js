import Button from "../framework/elements/Button";
import Label from "../framework/elements/Label";
import Textbox from "../framework/elements/Textbox";
import BasePage from "./base/BasePage";


export default class VkIdEnterPasswordPage extends BasePage{

    #PasswordTextBox = new Textbox("input[name=\"password\"]", "Password text box");
    #ContinueButton = new Button("button[type=\"submit\"]", "Continue button");

    constructor(){
        super(new Label(".vkc__PromoBox__mobileBox", "Promo box"), "VkId enter password page");
    }

    typePassword(password){
        this.#PasswordTextBox.sendKeys(password);
    }

    clickContinue(){
        this.#ContinueButton.click();
    }
}