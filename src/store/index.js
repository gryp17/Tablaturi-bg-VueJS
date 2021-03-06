import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import authModule from '@/store/modules/auth';
import userModule from '@/store/modules/user';
import formsModule from '@/store/modules/forms';
import modalsModule from '@/store/modules/modals';
import tabsModule from '@/store/modules/tabs';
import commentsModule from '@/store/modules/comments';
import articlesModule from '@/store/modules/articles';
import miscModule from '@/store/modules/misc';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		user: userModule,
		forms: formsModule,
		modals: modalsModule,
		tabs: tabsModule,
		comments: commentsModule,
		articles: articlesModule,
		misc: miscModule
	},
	state: {
		...config,
		appIsReady: false
	},
	mutations: {
		setAppIsReady(state, ready) {
			state.appIsReady = ready;
		}
	},
	actions: {
		/**
		 * Sets the app as ready (usually called when all initial data has been loaded)
		 * @param {Object} context
		 */
		setAppAsReady(context) {
			context.commit('setAppIsReady', true);
		}
	}
});
