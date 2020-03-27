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
		},
		isLoggedIn(state) {
			return !!state.userSession;
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
		/**
		 * Sets the page to be opened after the user logs in
		 * @param {Object} context
		 * @param {Object} value
		 */
		setRedirectAfterLogin(context, value) {
			context.commit('setRedirectAfterLogin', value);
		},
		/**
		 * Fetches the user session/login status of the current user
		 * @param {Object} context
		 * @returns {Promise}
		 */
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
		/**
		 * Logs in the user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
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
		/**
		 * Logs out the user
		 * @param {Object} context
		 * @returns {Promise}
		 */
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
		/**
		 * Signs up the user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		signup(context, { username, email, password, repeatPassword, birthday, gender, captcha }) {
			return UserHttpService.signup(username, email, password, repeatPassword, birthday, gender, captcha).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `signup failed - ${error}`
				});
			});
		},
		/**
		 * Sends the password reset request
		 * @param {Object} context
		 * @param {String} email
		 * @returns {Promise}
		 */
		sendPasswordResetRequest(context, email) {
			return UserHttpService.sendPasswordResetRequest(email).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password reset failed - ${error}`
				});
			});
		},
		/**
		 * Checks if the password reset hash is valid
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		checkPasswordResetHash(context, { userId, hash }) {
			return UserHttpService.checkPasswordResetHash(userId, hash).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password reset hash check failed - ${error}`
				});
			});
		},
		/**
		 * Updates the user password
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		updatePassword(context, { userId, hash, password, repeatPassword }) {
			return UserHttpService.updatePassword(userId, hash, password, repeatPassword).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `password update failed - ${error}`
				});
			});
		},
		/**
		 * Activates the user account
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		activateUser(context, { userId, hash }) {
			return UserHttpService.activateUser(userId, hash).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `user activation failed - ${error}`
				});
			});
		},
		/**
		 * Resends the user activation email
		 * @param {Object} context
		 * @param {String} email
		 * @returns {Promise}
		 */
		resendActivation(context, email) {
			return UserHttpService.resendActivation(email).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `resend activation failed - ${error}`
				});
			});
		}
	}
};
