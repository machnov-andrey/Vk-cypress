import BaseElement from "./BaseElement";

export default class Label extends BaseElement{

    constructor(locator, name, parentElement){
        super(locator, name, parentElement);
    }

    getText(aliasReturn){
        this._findElement().invoke('text').as(aliasReturn);
    }
}