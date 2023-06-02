import BaseElement from "./BaseElement";

export default class Button extends BaseElement{

    constructor(locator, name, parentElement){
        super(locator, name, parentElement);
    }

    click(){
        this._findElement().click();
    }
}