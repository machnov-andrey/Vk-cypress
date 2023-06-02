import Button from "../framework/elements/Button";
import Label from "../framework/elements/Label";
import Textbox from "../framework/elements/Textbox";
import BasePage from "./base/BasePage";

export default class WelcomePage extends BasePage{

    #EmailOrPhoneTextBox = new Textbox("#index_email", "Phone or email text box");
    #SignInButton = new Button(".VkIdForm__signInButton", "Sign in button");

    constructor(){
        super(new Label(".LoginMobilePromo__devices", "Mobile promo"), "Welcome page");
    }

    typePhoneOrEmail(phoneOrEmail){
        this.#EmailOrPhoneTextBox.sendKeys(phoneOrEmail);
    }

    clickSignInButton(){
        this.#SignInButton.click();
    }
}