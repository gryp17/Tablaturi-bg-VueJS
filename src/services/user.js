
import API from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} username
	 * @param {String} password
	 * @param {Boolean} rememberMe
	 * @returns {Promise}
	 */
	login(username, password, rememberMe) {
		return API.post('/User/login', {
			username,
			password,
			remember_me: rememberMe
		});
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession() {
		return API.get('/User/isLoggedIn');
	},
	/**
	 * Logs out the user
	 * @returns {Promise}
	 */
	logout() {
		return API.get('/User/logout');
	},
	/**
	 * Sends a password reset request for the specified email
	 * @param {String} email
	 * @returns {Promise}
	 */
	sendPasswordResetRequest(email) {
		return API.post('/PasswordReset/sendPasswordResetRequest', {
			email
		});
	},
	checkPasswordResetHash(userId, hash) {

	}
};
