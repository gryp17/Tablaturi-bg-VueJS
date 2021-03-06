import Vue from 'vue';
import UserHttpService from '@/services/user';

export default {
	namespaced: true,
	state: {
		user: null,
		users: [],
		total: 0,
		page: 0,
		perPage: 10

	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setUsers(state, users) {
			state.users = users;
		},
		setTotal(state, total) {
			state.total = total;
		},
		setPage(state, page) {
			state.page = page;
		}
	},
	actions: {
		/**
		 * Fetches the user data for the requested user
		 * @param {Object} context
		 * @param {Number} userId
		 * @returns {Promise}
		 */
		getUser(context, userId) {
			return UserHttpService.getUser(userId).then((res) => {
				context.commit('setUser', res.data);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get user failed - ${error}`
				});
			});
		},
		/**
		 * Updates an existing user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		updateUser(context, data) {
			return UserHttpService.updateUser(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update user failed - ${error}`
				});
			});
		},
		/**
		 * Returns all users that match the search criterias
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		search(context, { keyword, page }) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return UserHttpService.search(keyword, limit, offset).then((res) => {
				if (!res.data.error) {
					context.commit('setUsers', res.data.results);
					context.commit('setTotal', res.data.total);
					context.commit('setPage', page);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `user search failed - ${error}`
				});
			});
		},
		/**
		 * Sends a user report
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		reportUser(context, { userId, report }) {
			return UserHttpService.reportUser(userId, report).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `report user failed - ${error}`
				});
			});
		}
	}
};
