import Vue from 'vue';
import UserCommentHttpService from '@/services/user-comment';

export default {
	namespaced: true,
	state: {
		comments: []
	},
	mutations: {
		setComments(state, comments) {
			state.comments = comments;
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
		getUserComments(context, { userId, limit, offset }) {
			return UserCommentHttpService.getUserComments(userId, limit, offset).then((res) => {
				context.commit('setComments', res.data);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserComments failed - ${error}`
				});
			});
		}
	}
};
