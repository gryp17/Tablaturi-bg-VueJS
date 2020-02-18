import Vue from 'vue';
import MiscHttpService from '@/services/misc';

export default {
	namespaced: true,
	actions: {
		sendContactUsForm(context, { username, email, message, captcha }) {
			return MiscHttpService.contactUs(username, email, message, captcha).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `failed to submit contact us form - ${error}`
				});
			});
		}
	}
};
