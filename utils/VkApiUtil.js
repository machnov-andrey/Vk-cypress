import VkEndpoints from "../enums/VkEndpoints";
import VkParams from "../enums/VkParams";
import config from "../resources/Config";
import HttpUtil from "./HttpUtil";


export default class VkApiUtil {

    /**
     * 
     * @param {string} access_token 
     * @param {string} api_version 
     * @param {Array<string>} user_ids_array 
     * @param {Array<string>} fields_array 
     * @param {string} name_case 
     * @returns {Promise}
     */
    static usersGet(aliasReturn, access_token, api_version, user_ids_array = null, fields_array = null, name_case = null) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, access_token],
            [VkParams.V, api_version]
        ]));

        if (user_ids_array != null && user_ids_array instanceof Array) {
            params.set(VkParams.USER_IDS, user_ids_array.join());
        }

        if (!fields_array != null && fields_array instanceof Array) {
            params.set(VkParams.FIELDS, fields_array.join());
        }

        if (name_case != null) {
            params.set(VkParams.NAME_CASE, name_case);
        }

        return HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.USERS_GET, params), aliasReturn);
    }

    /**
     * @param {string} access_token 
     * @param {string} api_version 
     * @param {string} message 
     * @param {*} attachments
     * @param {string} alias
     * @returns {int} Id созданной записи на стене
     */
    static wallPost(alias, access_token, api_version, message, attachments) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, access_token],
            [VkParams.V, api_version]
        ]));

        if (message === null && attachments === null) {
            throw new Error("Message and attachment cannot be null at the same time");
        }

        if (message != null) {
            params.set(VkParams.MESSAGE, message);
        }

        if (attachments != null) {
            params.set(VkParams.ATTACHMENTS, attachments);
        }

        HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.WALL_POST, params), alias);
    }

    /**
     * 
     * @param {string} aliasReturn 
     * @param {string} accessToken 
     * @param {string} apiVersion 
     * @param {string} postId 
     * @param {string} message 
     * @param {string} attachments 
     */
    static wallEdit(aliasReturn, accessToken, apiVersion, postId, message, attachments) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, accessToken],
            [VkParams.V, apiVersion]
        ]));

        if (postId === null) {
            throw new Error("wall.edit api request can't have null `post_id` parameter");
        } else {
            params.set(VkParams.POST_ID, postId);
        }

        if (message === null && attachments === null) {
            throw new Error("Message and attachment cannot be null at the same time");
        }

        if (message != null) {
            params.set(VkParams.MESSAGE, message);
        }

        if (attachments != null) {
            params.set(VkParams.ATTACHMENTS, attachments);
        }

        HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.WALL_EDIT, params), aliasReturn);
    }

    /**
     * 
     * @param {string} aliasReturn 
     * @param {string} accessToken 
     * @param {string} apiVersion 
     * @param {string} title 
     */
    static photosCreateAlbum(aliasReturn, accessToken, apiVersion, title) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, accessToken],
            [VkParams.V, apiVersion]
        ]));

        if (title === null) {
            throw new Error("photos.createAlbum api request can't have null `title` parameter");
        } else {
            params.set(VkParams.TITLE, title);
        }

        HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.PHOTOS_CREATE_ALBUM, params), aliasReturn);
    }

    static photosGetWallUploadServer(aliasReturn, accessToken, apiVersion) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, accessToken],
            [VkParams.V, apiVersion]
        ]));

        HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.PHOTOS_GET_WALL_UPLOAD_SERVER, params), aliasReturn);
    }

    static photosSaveWallPhoto(aliasReturn, accessToken, apiVersion, photo, server, hash) {
        let params = new Map(([
            [VkParams.ACCESS_TOKEN, accessToken],
            [VkParams.V, apiVersion]
        ]));

        if (photo !== null && server !== null && hash !== null) {
            params.set(VkParams.PHOTO, photo);
            params.set(VkParams.SERVER, server);
            params.set(VkParams.HASH, hash);
        } else {
            throw new Error("Required request params is undefined");
        }

        HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.PHOTOS_SAVE_WALL_PHOTO, params), aliasReturn);
    }

    static wallCreateComment(aliasReturn, accessToken, apiVersion, postId, message) {
        if (accessToken !== null && apiVersion !== null && postId !== null && message !== null) {
            HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.WALL_CREATE_COMMENT, new Map(([
                [VkParams.ACCESS_TOKEN, accessToken],
                [VkParams.V, apiVersion],
                [VkParams.POST_ID, postId],
                [VkParams.MESSAGE, message]
            ]))), aliasReturn);
        } else {
            throw new Error("Required request params is undefined");
        }
    }

    static likesGetList(aliasReturn, accessToken, apiVersion, type, itemId) {
        if (accessToken !== null && apiVersion !== null && type !== null && itemId !== null) {
            HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.LIKES_GET_LIST, new Map(([
                [VkParams.ACCESS_TOKEN, accessToken],
                [VkParams.V, apiVersion],
                [VkParams.TYPE, type],
                [VkParams.ITEM_ID, itemId]
            ]))), aliasReturn);
        } else {
            throw new Error("Required request params is undefined");
        }
    }

    static wallDelete(aliasReturn, accessToken, apiVersion, postId) {
        if (accessToken !== null && apiVersion !== null && postId !== null) {
            HttpUtil.get(HttpUtil.build_query(config.vkApiUrl, VkEndpoints.WALL_DELETE, new Map(([
                [VkParams.ACCESS_TOKEN, accessToken],
                [VkParams.V, apiVersion],
                [VkParams.POST_ID, postId],
            ]))), aliasReturn);
        } else {
            throw new Error("Required request params is undefined");
        }
    }
}