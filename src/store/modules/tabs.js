import Vue from 'vue';
import TabHttpService from '@/services/tab';

export default {
	namespaced: true,
	state: {
		totalTabs: {
			text: 0,
			gp: 0
		},
		tab: null
	},
	mutations: {
		setTotalTabs(state, total) {
			Vue.set(state, 'totalTabs', total);
		},
		setTab(state, tab) {
			state.tab = tab;
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
	}
};
