
import API from './API';

export default {
	/**
	 * Adds new article comment
	 * @param {Number} articleId
	 * @param {String} content
	 * @returns {Promise}
	 */
	addArticleComment(articleId, content) {
		return API.post('/ArticleComment/addArticleComment', {
			article_id: articleId,
			content
		});
	},
	/**
	 * Fetches the article comments
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getArticleComments(articleId, limit, offset) {
		return API.get(`/ArticleComment/getArticleComments?article_id=${articleId}&limit=${limit}&offset=${offset}`);
	}
};
