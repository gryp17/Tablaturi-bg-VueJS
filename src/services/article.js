
import API from './API';

export default {
	/**
	 * Adds new article
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	addArticle(formData) {
		return API.post('/Article/addArticle', formData);
	},
	/**
	 * Fetches all articles that match the limit/offset params
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getArticles(limit, offset) {
		return API.get(`/Article/getArticles?limit=${limit}&offset=${offset}`);
	}
};
