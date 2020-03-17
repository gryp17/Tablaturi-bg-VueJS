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
		addUserComment(context, { id, content }) {
			return UserCommentHttpService.addUserComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addUserComment failed - ${error}`
				});
			});
		},
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
		addArticleComment(context, { id, content }) {
			return ArticleCommentHttpService.addArticleComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article comment failed - ${error}`
				});
			});
		},
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
		addTabComment(context, { id, content }) {
			return TabCommentHttpService.addTabComment(id, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add tab comment failed - ${error}`
				});
			});
		},
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
