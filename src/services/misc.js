
import API from './API';

export default {
	/**
	  * Sends the contact us form data
	  * @param {String} username
	  * @param {String} email
	  * @param {String} message
	  * @param {String} captcha
	  * @returns {Promise}
	  */
	contactUs(username, email, message, captcha) {
		return API.post('/Misc/contactUs', {
			username,
			email,
			message,
			captcha
		});
	}
};
