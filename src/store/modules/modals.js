export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
	},
	mutations: {
		setLoginModalOpened(state, opened) {
			state.loginModalOpened = opened;
		}
	},
	actions: {
		showLoginModal(context) {
			context.commit('setLoginModalOpened', true);
		},
		hideLoginModal(context) {
			context.commit('setLoginModalOpened', false);
		}
	}
};
