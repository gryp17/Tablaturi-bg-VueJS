export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
		editProfileModalOpened: false,
		reportUserModalOpened: false
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
		}
	},
	actions: {
		showLoginModal(context) {
			context.commit('setLoginModalOpened', true);
		},
		hideLoginModal(context) {
			context.commit('setLoginModalOpened', false);
		},
		showSignupModal(context) {
			context.commit('setSignupModalOpened', true);
		},
		hideSignupModal(context) {
			context.commit('setSignupModalOpened', false);
		},
		showEditProfileModal(context) {
			context.commit('setEditProfileModalOpened', true);
		},
		hideEditProfileModal(context) {
			context.commit('setEditProfileModalOpened', false);
		},
		showReportUserModal(context) {
			context.commit('setReportUserModalOpened', true);
		},
		hideReportUserModal(context) {
			context.commit('setReportUserModalOpened', false);
		}
	}
};
