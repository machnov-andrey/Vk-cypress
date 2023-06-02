import Form from "../../framework/elements/Form";
import BasePage from "./BasePage";


export default class BaseForm extends BasePage {

    constructor(locator, name){
        super(new Form(locator, name), `Form '${name}'`);
    }
}