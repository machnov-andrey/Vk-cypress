import CypressUtil from "./CypressUtil";

export default class AssertUtil {

    static assertEqualsBothAlias(aliasLeft, aliasRight, message) {
        CypressUtil.get_alias(aliasLeft).then(left => {
            CypressUtil.get_alias(aliasRight).should('equal', left, message);
        });
    }

    static assertEqualsLeftAlias(alias, value, message) {
        CypressUtil.get_alias(alias).should('equal', value, message);
    }
}