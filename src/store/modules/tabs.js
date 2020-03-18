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
		addTab(context, data) {
			return TabHttpService.addTab(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add tab failed - ${error}`
				});
			});
		},
		updateTab(context, data) {
			return TabHttpService.updateTab(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update tab failed - ${error}`
				});
			});
		},
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
		deleteFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.deleteFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `remove user favourite failed - ${error}`
				});
			});
		},
		addFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.addFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add user favourite failed - ${error}`
				});
			});
		},
		isFavouriteTab(context, tabId) {
			return UserFavouriteHttpService.isFavouriteTab(tabId).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `is favourite tab failed - ${error}`
				});
			});
		},
		autocomplete(context, { type, term, band }) {
			return TabHttpService.autocomplete(type, term, band).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `autocomplete failed - ${error}`
				});
			});
		},
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
		reportTab(context, { tabId, report }) {
			return TabHttpService.reportTab(tabId, report).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `report tab failed - ${error}`
				});
			});
		},
		rateTab(context, { tabId, rating }) {
			return TabHttpService.rateTab(tabId, rating).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `rate tab failed - ${error}`
				});
			});
		},
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
