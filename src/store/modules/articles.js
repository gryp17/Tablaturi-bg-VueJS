import Vue from 'vue';
import ArticleHttpService from '@/services/article';

export default {
	namespaced: true,
	state: {
		article: null,
		articles: [],
		total: 0,
		page: 0,
		perPage: 6
	},
	mutations: {
		setArticle(state, article) {
			state.article = article;
		},
		setArticles(state, articles) {
			state.articles = articles;
		},
		setTotal(state, total) {
			state.total = total;
		},
		setPage(state, page) {
			state.page = page;
		}
	},
	actions: {
		/**
		 * Adds a new article
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		addArticle(context, data) {
			return ArticleHttpService.addArticle(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article failed - ${error}`
				});
			});
		},
		/**
		 * Updates an existing article
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		updateArticle(context, data) {
			return ArticleHttpService.updateArticle(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update article failed - ${error}`
				});
			});
		},
		/**
		 * Returns a list of articles matching the requested page
		 * @param {Object} context
		 * @param {Number} page
		 * @returns {Promise}
		 */
		getArticles(context, page) {
			const limit = context.state.perPage;
			const offset = page * limit;

			if (page === 0) {
				context.commit('setArticles', []);
			}

			return ArticleHttpService.getArticles(limit, offset).then((res) => {
				let articles = res.data.results;

				if (page > 0) {
					articles = [...context.state.articles, ...articles];
				}

				context.commit('setArticles', articles);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get articles failed - ${error}`
				});
			});
		},
		/**
		 * Returns the article that corresponds to the requested id
		 * @param {Object} context
		 * @param {Number} id
		 * @returns {Promise}
		 */
		getArticle(context, id) {
			context.commit('setArticle', null);

			return ArticleHttpService.getArticle(id).then((res) => {
				if (res.data && res.data.ID) {
					context.commit('setArticle', res.data);
				}

				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get article failed - ${error}`
				});
			});
		}
	}
};
