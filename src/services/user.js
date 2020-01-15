
import API, { API_URL } from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} username
	 * @param {String} password
	 * @param {Boolean} rememberMe
	 * @returns {Promise}
	 */
	login(username, password, rememberMe) {
		return API.post(`${API_URL}/User/login`, {
			login_username: username,
			login_password: password,
			login_remember_me: rememberMe
		});
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession() {
		return API.get(`${API_URL}/User/isLoggedIn`);
	},
	/**
	 * Logs out the user
	 * @returns {Promise}
	 */
	logout() {
		return API.get(`${API_URL}/User/logout`);
	},
};
