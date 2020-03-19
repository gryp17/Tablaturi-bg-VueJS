import Vue from 'vue';
import UserCommentHttpService from '@/services/user-comment';
import ArticleCommentHttpService from '@/services/article-comment';
import TabCommentHttpService from '@/services/tab-comment';

export default {
	namespaced: true,
	state: {
		comments: [],
		total: 0,
		page: 0,
		perPage: 5
	},
	mutations: {
		setComments(state, comments) {
			state.comments = comments;
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
		 * Adds a new user comment
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		addUserComment(context, { id, content }) {
			return UserCommentHttpService.addUserComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addUserComment failed - ${error}`
				});
			});
		},
		/**
		 * Fetches the user comments by page
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		getUserComments(context, { id, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return UserCommentHttpService.getUserComments(id, limit, offset).then((res) => {
				context.commit('setComments', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserComments failed - ${error}`
				});
			});
		},
		/**
		 * Adds a new article comment
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		addArticleComment(context, { id, content }) {
			return ArticleCommentHttpService.addArticleComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article comment failed - ${error}`
				});
			});
		},
		/**
		 * Fetches the article comments by page
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		getArticleComments(context, { id, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return ArticleCommentHttpService.getArticleComments(id, limit, offset).then((res) => {
				context.commit('setComments', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get article comments failed - ${error}`
				});
			});
		},
		/**
		 * Adds a new tab comment
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		addTabComment(context, { id, content }) {
			return TabCommentHttpService.addTabComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add tab comment failed - ${error}`
				});
			});
		},
		/**
		 * Fetches the tab comments by page
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		getTabComments(context, { id, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return TabCommentHttpService.getTabComments(id, limit, offset).then((res) => {
				context.commit('setComments', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get tab comments failed - ${error}`
				});
			});
		}
	}
};
