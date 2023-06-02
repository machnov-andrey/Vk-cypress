export default class HttpUtil {

    /**
     * 
     * @param {string} query 
     * @param {string} alias 
     */
    static get(query, alias) {
        cy.request(query).as(alias);
    }

    /**
     * 
     * @param {string} query 
     * @param {Object} body 
     */
    static post(query, body) {
        return cy.request('POST', query, body);
    }

    /**
     * 
     * @param {string} alias 
     * @param {string} query 
     * @param {Object} body 
     */
    static post_alias(query, body, aliasReturn) {
        this.post(query, body).as(aliasReturn);
    }

    /**
     * 
     * @param {string} base_url 
     * @param {string} endpoint 
     * @param {Map} params 
     * @returns {string}
     */
    static build_query(base_url, endpoint, params) {
        let query = "";

        if (base_url.slice(-1) === "/") {
            query = `${base_url}${endpoint}`;
        } else {
            query = `${base_url}/${endpoint}`;
        }

        if (params.size != 0) {
            query = query.concat("?");
        }

        for (let param of params) {
            query = query.concat(`${param[0]}=${param[1]}&`);
        }

        query = query.slice(0, -1);

        return query;
    }
}