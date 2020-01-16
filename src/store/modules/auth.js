import Vue from 'vue';
import UserHttpService from '@/services/user';

export default {
	namespaced: true,
	state: {
		userSession: null
	},
	mutations: {
		setUserSession(state, userSession) {
			state.userSession = userSession;
		}
	},
	actions: {
		getUserSession(context) {
			UserHttpService.getSession().then((res) => {
				if (res.data && res.data.user) {
					context.commit('setUserSession', res.data.user);
				}
				return res.data;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserSession failed - ${error}`
				});
			});
		},
		login(context, { username, password, rememberMe }) {
			UserHttpService.login(username, password, rememberMe).then((res) => {
				context.commit('setUserSession', res.data);
				return res.data;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `login failed - ${error}`
				});
			});
		},
		logout(context) {
			UserHttpService.logout().then((res) => {
				context.commit('setUserSession', null);
				return res.data;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `logout failed - ${error}`
				});
			});
		}
	}
};
