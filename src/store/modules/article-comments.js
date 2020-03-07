import Vue from 'vue';
import ArticleCommentHttpService from '@/services/article-comment';

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
		addArticleComment(context, { articleId, content }) {
			return ArticleCommentHttpService.addArticleComment(articleId, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article comment failed - ${error}`
				});
			});
		},
		getArticleComments(context, { articleId, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return ArticleCommentHttpService.getArticleComments(articleId, limit, offset).then((res) => {
				context.commit('setComments', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get article comments failed - ${error}`
				});
			});
		}
	}
};
