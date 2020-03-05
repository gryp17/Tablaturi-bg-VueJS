
import API from './API';

export default {
	/**
	 * Adds new article
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	addArticle(formData) {
		return API.post('/Article/addArticle', formData);
	}
};
