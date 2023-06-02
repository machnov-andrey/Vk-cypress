
export default class CypressUtil {

    /**
     * 
     * @param {string} locator_or_alias 
     * @returns 
     */
    static get(locator_or_alias) {
        return cy.get(locator_or_alias)
    }

    static get_alias(alias) {
        return this.get(`@${alias}`)
    }

    static visit(url) {
        cy.visit(url);
    }

    static wrap_alias(wrapped, alias) {
        if (alias === undefined) {
            cy.wrap(wrapped);
        } else {
            cy.wrap(wrapped).as(alias);
        }
    }

    static return_wrap(wrapped) {
        return cy.wrap(wrapped);
    }

    static wait(milliSeconds) {
        cy.wait(milliSeconds);
    }
}