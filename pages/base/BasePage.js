import BaseElement from "../../framework/elements/BaseElement";


export default class BasePage {

    /**
     * 
     * @param {BaseElement} baseElement 
     * @param {string} pageName 
     */
    constructor(baseElement, pageName) {
        this._baseElement = baseElement;
        this._pageName = pageName;
    }

    isOpened(aliasReturn) {
        this._baseElement.isDisplayed(aliasReturn);
    }

    scrollToBottom(){
        this._baseElement._findElement().scrollTo('bottom');
    }
}