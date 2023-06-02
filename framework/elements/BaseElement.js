import CypressUtil from "../../utils/CypressUtil";
import Config from "../../resources/Config";
import LogUtil from "../../utils/LogUtil";


export default class BaseElement {

    /**
     * 
     * @param {string} locator 
     * @param {string} name 
     * @param {BaseElement} parentElement
     */
    constructor(locator, name, parentElement) {
        this._locator = locator;
        this._name = name;
        this._parentElement = parentElement;
    }

    get locator() {
        return this._locator;
    }

    get name() {
        return this._name;
    }

    _findElement() {
        if (this._parentElement === undefined) {
            return CypressUtil.get(this._locator)
        } else {
            return this._parentElement._findElement().find(this._locator);
        }
    }

    isDisplayed(aliasReturn) {
        LogUtil.log(`Проверяем видимость элемента '${this._name}'`);
        CypressUtil.wait(Config.pollingInterval);

        CypressUtil.get("body").then(body => {
            if (body.find(this._locator).length > 0) {

                this._findElement().then(element => {

                    if (element.is(':visible')) {
                        CypressUtil.wrap_alias(true, aliasReturn);
                    } else {
                        CypressUtil.wrap_alias(false, aliasReturn);
                    }
                });

            } else {
                CypressUtil.wrap_alias(false, aliasReturn);
            }
        });
    }
}
