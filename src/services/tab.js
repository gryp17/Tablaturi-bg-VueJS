
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
		return API.post('Tab/updateTab', formData);
	}
};
