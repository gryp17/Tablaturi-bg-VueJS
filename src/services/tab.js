
import API from './API';

export default {
	/**
	 * Returns the total text and GP tabs count
	 * @returns {Promise}
	 */
	getTabsCount() {
		return API.get('/Tab/getTabsCount');
	}
};
