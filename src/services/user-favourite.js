
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
	},
	/**
	 * Adds the favourite tab
	 * @param {Number} tabId
	 * @returns {Promise}
	 */
	addFavouriteTab(tabId) {
		return API.post('/UserFavourite/addFavouriteTab', {
			tab_id: tabId
		});
	},
	/**
	 * Checks if the tab is in the users favourite tabs list
	 * @param {Number} tabId
	 * @returns {Promise}
	 */
	isFavouriteTab(tabId) {
		return API.get(`/UserFavourite/isFavouriteTab?tab_id=${tabId}`);
	}
};
