
import API from './API';

export default {
	/**
	 * Adds new tab comment
	 * @param {Number} tabId
	 * @param {String} content
	 * @returns {Promise}
	 */
	addTabComment(tabId, content) {
		return API.post('/TabComment/addTabComment', {
			tab_id: tabId,
			content
		});
	},
	/**
	 * Fetches the tab comments
	 * @param {Number} tabId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getTabComments(tabId, limit, offset) {
		return API.get(`/TabComment/getTabComments?tab_id=${tabId}&limit=${limit}&offset=${offset}`);
	}
};
