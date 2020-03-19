import Vue from 'vue';
import TabHttpService from '@/services/tab';
import UserFavouriteHttpService from '@/services/user-favourite';

export default {
	namespaced: true,
	state: {
		tab: null,
		totalTabs: {
			text: 0,
			gp: 0
		},
		most: {
			popular: [],
			liked: [],
			latest: [],
			commented: []
		},
		userTabs: {
			tabs: [],
			total: 0,
			page: 0,
			perPage: 10
		},
		userFavourites: {
			tabs: [],
			total: 0,
			page: 0,
			perPage: 10
		},
		search: {
			tabs: [],
			total: 0,
			page: 0,
			perPage: 20
		}
	},
	mutations: {
		setTotalTabs(state, total) {
			Vue.set(state, 'totalTabs', total);
		},
		setTab(state, tab) {
			state.tab = tab;
		},
		setUserTabs(state, tabs) {
			state.userTabs.tabs = tabs;
		},
		setUserTabsTotal(state, total) {
			state.userTabs.total = total;
		},
		setUserTabsPage(state, page) {
			state.userTabs.page = page;
		},
		setUserFavourites(state, tabs) {
			state.userFavourites.tabs = tabs;
		},
		setUserFavouritesTotal(state, total) {
			state.userFavourites.total = total;
		},
		setUserFavouritesPage(state, page) {
			state.userFavourites.page = page;
		},
		setSearchTabs(state, tabs) {
			state.search.tabs = tabs;
		},
		setSearchTotal(state, total) {
			state.search.total = total;
		},
		setSearchPage(state, page) {
			state.search.page = page;
		},
		setMost(state, { type, tabs }) {
			state.most[type] = tabs;
		}
	},
	actions: {
		/**
		 * Fetches the total text and gp tabs count
		 * @param {Object} context
		 * @returns {Promise}
		 */
		getTabsCount(context) {
			return TabHttpService.getTabsCount().then((res) => {
				context.commit('setTotalTabs', res.data);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getTabsCount failed - ${error}`
				});
			});
		},
		/**
		 * Fetches a single tab record
		 * @param {Object} context
		 * @param {Number} id
		 * @returns {Promise}
		 */
		getTab(context, id) {
			context.commit('setTab', null);

			return TabHttpService.getTab(id).then((res) => {
				if (res.data && res.data.ID) {
					context.commit('setTab', res.data);
				}

				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get tab failed - ${error}`
				});
			});
		},
		/**
		 * Adds a new tab record
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		addTab(context, data) {
			return TabHttpService.addTab(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add tab failed - ${error}`
				});
			});
		},
		/**
		 * Updates an existing tab
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		updateTab(context, data) {
			return TabHttpService.updateTab(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update tab failed - ${error}`
				});
			});
		},
		/**
		 * Fetches the tabs uploaded by the requested user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		getUserTabs(context, { id, page }) {
			const limit = context.state.userTabs.perPage;
			const offset = page * limit;

			return TabHttpService.getTabsByUploader(id, limit, offset).then((res) => {
				context.commit('setUserTabs', res.data.results);
				context.commit('setUserTabsTotal', res.data.total);
				context.commit('setUserTabsPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get user tabs failed - ${error}`
				});
			});
		},
		/**
		 * Fetches the favourite tabs list for the requested user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		getUserFavouriteTabs(context, { id, page }) {
			const limit = context.state.userFavourites.perPage;
			const offset = page * limit;

			return UserFavouriteHttpService.getUserFavourites(id, limit, offset).then((res) => {
				context.commit('setUserFavourites', res.data.results);
				context.commit('setUserFavouritesTotal', res.data.total);
				context.commit('setUserFavouritesPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get user favourites failed - ${error}`
				});
			});
		},
		/**
		 * Removes the tab from the user's favourite list
		 * @param {Object} context
		 * @param {Number} tabId
		 * @returns {Promise}
		 */
		deleteFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.deleteFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `remove user favourite failed - ${error}`
				});
			});
		},
		/**
		 * Adds the tab to the user's favourite list
		 * @param {Object} context
		 * @param {Number} tabId
		 * @returns {Promise}
		 */
		addFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.addFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add user favourite failed - ${error}`
				});
			});
		},
		/**
		 * Checks if the tab is in the user's favourite tabs list
		 * @param {Object} context
		 * @param {Number} tabId
		 * @returns {Promise}
		 */
		isFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.isFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `is favourite tab failed - ${error}`
				});
			});
		},
		/**
		 * Returns all tabs/songs that match the passed term
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		autocomplete(context, { type, term, band }) {
			return TabHttpService.autocomplete(type, term, band).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `autocomplete failed - ${error}`
				});
			});
		},
		/**
		 * Returns all tabs that match the search params
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		search(context, { type, band, song, page }) {
			const limit = context.state.search.perPage;
			const offset = page * limit;

			return TabHttpService.search(type, band, song, limit, offset).then((res) => {
				context.commit('setSearchTabs', res.data.results);
				context.commit('setSearchTotal', res.data.total);
				context.commit('setSearchPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `search failed - ${error}`
				});
			});
		},
		/**
		 * Returns the top tabs for each category/type
		 * @param {Object} context
		 * @param {String} type
		 * @returns {Promise}
		 */
		getMost(context, type) {
			const limit = 5;

			return TabHttpService.getMost(type, limit).then((res) => {
				context.commit('setMost', {
					type,
					tabs: res.data
				});
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get most tabs failed - ${error}`
				});
			});
		},
		/**
		 * Sends a tab report
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		reportTab(context, { tabId, report }) {
			return TabHttpService.reportTab(tabId, report).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `report tab failed - ${error}`
				});
			});
		},
		/**
		 * Rates the tab
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		rateTab(context, { tabId, rating }) {
			return TabHttpService.rateTab(tabId, rating).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `rate tab failed - ${error}`
				});
			});
		},
		/**
		 * Checks if the tab has been rated already
		 * @param {Object} context
		 * @param {Number} tabId
		 * @returns {Promise}
		 */
		tabIsRated(context, tabId) {
			return TabHttpService.tabIsRated(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `tab is rated failed - ${error}`
				});
			});
		}
	}
};
