
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
	}
};
