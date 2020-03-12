
import API from './API';

export default {
	/**
	 * Fetches the user favourite tabs
	 * @param {Number} userId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getUserFavourites(userId, limit, offset) {
		return API.get(`/UserFavourite/getUserFavourites?user_id=${userId}&limit=${limit}&offset=${offset}`);
	},
	/**
	 * Removes the favourite tab
	 * @param {Number} tabId
	 * @returns {Promise}
	 */
	deleteFavouriteTab(tabId) {
		return API.post('/UserFavourite/deleteFavouriteTab', {
			tab_id: tabId
		});
	}
};
