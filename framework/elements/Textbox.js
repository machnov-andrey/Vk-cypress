import BaseElement from "./BaseElement";

export default class Textbox extends BaseElement{

    constructor(locator, name){
        super(locator, name);
    }

    sendKeys(text){
        this._findElement().type(text);
    }
}