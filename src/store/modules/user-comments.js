import Vue from 'vue';
import UserCommentHttpService from '@/services/user-comment';

export default {
	namespaced: true,
	state: {
		comments: []
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
		}
	}
};
