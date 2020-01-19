import Vue from 'vue';
import TabHttpService from '@/services/tab';

export default {
	namespaced: true,
	state: {
		totalTabs: {
			text: 0,
			gp: 0
		}
	},
	mutations: {
		setTotalTabs(state, total) {
			Vue.set(state, 'totalTabs', total);
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
		}
	}
};
