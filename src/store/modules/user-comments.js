import Vue from 'vue';
import UserCommentHttpService from '@/services/user-comment';

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
		addUserComment(context, { userId, content }) {
			return UserCommentHttpService.addUserComment(userId, content).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addUserComment failed - ${error}`
				});
			});
		},
		getUserComments(context, { userId, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return UserCommentHttpService.getUserComments(userId, limit, offset).then((res) => {
				context.commit('setComments', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserComments failed - ${error}`
				});
			});
		}
	}
};
