import Vue from 'vue';
import UserHttpService from '@/services/user';

export default {
	namespaced: true,
	state: {
		user: null,
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	},
	actions: {
		getUser(context, userId) {
			return UserHttpService.getUser(userId).then((res) => {
				context.commit('setUser', res.data);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get user failed - ${error}`
				});
			});
		},
		updateUser(context, data) {
			return UserHttpService.updateUser(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update user failed - ${error}`
				});
			});
		}
	}
};
