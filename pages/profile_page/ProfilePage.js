import Label from "../../framework/elements/Label";
import BasePage from "../base/BasePage";
import WallForm from "./WallForm";


export default class ProfilePage extends BasePage {

    #wallForm = new WallForm();

    constructor(){
        super(new Label("#owner_page_name", "Name label"), "Profile page");
    }

    get wallForm(){
        return this.#wallForm;
    }
}