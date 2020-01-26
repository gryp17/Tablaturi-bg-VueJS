import Vue from 'vue';
import UserHttpService from '@/services/user';

export default {
	namespaced: true,
	state: {
		userSession: null,
		redirectAfterLogin: null
	},
	getters: {
		isAdmin(state) {
			return state.userSession && state.userSession.type === 'admin';
		}
	},
	mutations: {
		setUserSession(state, userSession) {
			state.userSession = userSession;
		},
		setRedirectAfterLogin(state, value) {
			state.redirectAfterLogin = value;
		}
	},
	actions: {
		setRedirectAfterLogin(context, value) {
			context.commit('setRedirectAfterLogin', value);
		},
		getUserSession(context) {
			return UserHttpService.getSession().then((res) => {
				if (res.data && res.data.user) {
					context.commit('setUserSession', res.data.user);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserSession failed - ${error}`
				});
			});
		},
		login(context, { username, password, rememberMe }) {
			return UserHttpService.login(username, password, rememberMe).then((res) => {
				if (res.data && res.data.ID) {
					context.commit('setUserSession', res.data);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `login failed - ${error}`
				});
			});
		},
		logout(context) {
			return UserHttpService.logout().then((res) => {
				context.commit('setUserSession', null);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `logout failed - ${error}`
				});
			});
		},
		sendPasswordResetRequest(context, email) {
			return UserHttpService.sendPasswordResetRequest(email).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password reset failed - ${error}`
				});
			});
		},
		checkPasswordResetHash(context, { userId, hash }) {
			return UserHttpService.checkPasswordResetHash(userId, hash).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password reset hash check failed - ${error}`
				});
			});
		},
		updatePassword(context, { userId, hash, password, repeatPassword }) {
			return UserHttpService.updatePassword(userId, hash, password, repeatPassword).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password update failed - ${error}`
				});
			});
		}
	}
};
