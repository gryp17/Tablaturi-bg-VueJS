import Vue from 'vue';
import Vuex from 'vuex';
import userModule from '@/store/modules/user';
import formModule from '@/store/modules/form';
import modalModule from '@/store/modules/modal';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user: userModule,
		form: formModule,
		modal: modalModule
	},
	state: {
		totalTabs: null,
		totalTabsGP: null
	},
	mutations: {
	},
	actions: {
	}
});
