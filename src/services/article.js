
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
	 * Updates an existing article
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	updateArticle(formData) {
		return API.post('Article/updateArticle', formData);
	},
	/**
	 * Fetches all articles that match the limit/offset params
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getArticles(limit, offset) {
		return API.get(`/Article/getArticles?limit=${limit}&offset=${offset}`);
	},
	/**
	 * Fetches the article that matches the provided id
	 * @param {Number} id
	 * @returns {Promise}
	 */
	getArticle(id) {
		return API.get(`/Article/getArticle?id=${id}`);
	}
};
