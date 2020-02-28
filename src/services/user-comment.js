
import API from './API';

export default {
	/**
	 * Adds new user comment
	 * @param {Number} userId
	 * @param {String} content
	 * @returns {Promise}
	 */
	addUserComment(userId, content) {
		return API.post('/UserComment/addUserComment', {
			user_id: userId,
			content
		});
	},
	/**
	 * Fetches the user comments
	 * @param {Number} userId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getUserComments(userId, limit, offset) {
		return API.get(`/UserComment/getUserComments?user_id=${userId}&limit=${limit}&offset=${offset}`);
	}
};
