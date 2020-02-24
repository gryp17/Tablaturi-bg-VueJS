export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
		editProfileModalOpened: false
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
		}
	}
};
