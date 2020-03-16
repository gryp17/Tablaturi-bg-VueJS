
import API from './API';

export default {
	/**
	 * Returns the total text and GP tabs count
	 * @returns {Promise}
	 */
	getTabsCount() {
		return API.get('/Tab/getTabsCount');
	},
	/**
	 * Fetches the tab that matches the passed id
	 * @param {Number} id
	 * @returns {Promise}
	 */
	getTab(id) {
		return API.get(`/Tab/getTab?id=${id}`);
	},
	/**
	 * Adds new tab
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	addTab(formData) {
		return API.post('/Tab/addTab', formData);
	},
	/**
	 * Updates an existing tab
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	updateTab(formData) {
		return API.post('/Tab/updateTab', formData);
	},
	/**
	 * Fetches the tabs by user
	 * @param {Number} uploaderId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getTabsByUploader(uploaderId, limit, offset) {
		return API.get(`/Tab/getTabsByUploader?uploader_id=${uploaderId}&limit=${limit}&offset=${offset}`);
	},
	/**
	 * Fetches the song/band autocomplete suggestions
	 * @param {String} type
	 * @param {String} term
	 * @param {String} band
	 * @returns {Promise}
	 */
	autocomplete(type, term, band) {
		return API.get(`/Tab/autocomplete?type=${type}&term=${term}&band=${band}`);
	},
	/**
	 * Returns all tabs that match the passed search params
	 * @param {String} type
	 * @param {String} band
	 * @param {String} song
	 * @param {Number} limit
	 * @param {Number} offset
	 */
	search(type, band, song, limit, offset) {
		return API.get(`/Tab/search?type=${type}&band=${band}&song=${song}&limit=${limit}&offset=${offset}`);
	},
	/**
	 * Returns the most popular/liked/latest/commented tabs
	 * @param {String} type
	 * @param {Number} limit
	 */
	getMost(type, limit) {
		return API.get(`/Tab/getMost?type=${type}&limit=${limit}`);
	}
};
