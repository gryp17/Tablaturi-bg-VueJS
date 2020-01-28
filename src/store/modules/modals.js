export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
	},
	mutations: {
		setLoginModalOpened(state, opened) {
			state.loginModalOpened = opened;
		},
		setSignupModalOpened(state, opened) {
			state.signupModalOpened = opened;
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
		}
	}
};
