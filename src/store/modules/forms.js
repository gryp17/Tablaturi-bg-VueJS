import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		errors: {
			login: {},
			signup: {},
			forgottenPassword: {},
			changePassword: {},
			contactUs: {},
			editProfile: {},
			addComment: {},
			userSearch: {},
			addArticle: {},
			reportUser: {}
		}
	},
	mutations: {
		setFormError(state, { form, field, error }) {
			Vue.set(state.errors[form], field, error);
		},
		resetFormErrors(state, form) {
			Vue.set(state.errors, form, {});
		}
	},
	actions: {
		clearFormError(context, { form, field }) {
			context.commit('setFormError', {
				form,
				field,
				error: null
			});
		},
		setFormError(context, { form, field, error }) {
			context.commit('setFormError', {
				form,
				field,
				error
			});
		},
		resetFormErrors(context, form) {
			context.commit('resetFormErrors', form);
		}
	}
};
