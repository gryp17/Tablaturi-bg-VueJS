import Vue from 'vue';
import Vuex from 'vuex';
import authModule from '@/store/modules/auth';
import formsModule from '@/store/modules/forms';
import modalsModule from '@/store/modules/modals';
import tabsModule from '@/store/modules/tabs';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		forms: formsModule,
		modals: modalsModule,
		tabs: tabsModule
	},
	state: {
	},
	mutations: {
	},
	actions: {
	}
});
