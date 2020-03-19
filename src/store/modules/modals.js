export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
		editProfileModalOpened: false,
		reportUserModalOpened: false,
		reportTabModalOpened: false
	},
	mutations: {
		setLoginModalOpened(state, opened) {
			state.loginModalOpened = opened;
		},
		setSignupModalOpened(state, opened) {
			state.signupModalOpened = opened;
		},
		setEditProfileModalOpened(state, opened) {
			state.editProfileModalOpened = opened;
		},
		setReportUserModalOpened(state, opened) {
			state.reportUserModalOpened = opened;
		},
		setReportTabModalOpened(state, opened) {
			state.reportTabModalOpened = opened;
		}
	},
	actions: {
		/**
		 * Shows the login modal
		 * @param {Object} context
		 */
		showLoginModal(context) {
			context.commit('setLoginModalOpened', true);
		},
		/**
		 * Hides the login modal
		 * @param {Object} context
		 */
		hideLoginModal(context) {
			context.commit('setLoginModalOpened', false);
		},
		/**
		 * Shows the signup modal
		 * @param {Object} context
		 */
		showSignupModal(context) {
			context.commit('setSignupModalOpened', true);
		},
		/**
		 * Hides the signup modal
		 * @param {Object} context
		 */
		hideSignupModal(context) {
			context.commit('setSignupModalOpened', false);
		},
		/**
		 * Shows the edit profile modal
		 * @param {Object} context
		 */
		showEditProfileModal(context) {
			context.commit('setEditProfileModalOpened', true);
		},
		/**
		 * Hides the edit profile modal
		 * @param {Object} context
		 */
		hideEditProfileModal(context) {
			context.commit('setEditProfileModalOpened', false);
		},
		/**
		 * Shows the report user modal
		 * @param {Object} context
		 */
		showReportUserModal(context) {
			context.commit('setReportUserModalOpened', true);
		},
		/**
		 * Hides the report user modal
		 * @param {Object} context
		 */
		hideReportUserModal(context) {
			context.commit('setReportUserModalOpened', false);
		},
		/**
		 * Shows the report tab modal
		 * @param {Object} context
		 */
		showReportTabModal(context) {
			context.commit('setReportTabModalOpened', true);
		},
		/**
		 * Hides the report tab modal
		 * @param {Object} context
		 */
		hideReportTabModal(context) {
			context.commit('setReportTabModalOpened', false);
		}
	}
};
