import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import authModule from '@/store/modules/auth';
import userModule from '@/store/modules/user';
import formsModule from '@/store/modules/forms';
import modalsModule from '@/store/modules/modals';
import tabsModule from '@/store/modules/tabs';
import userCommentsModule from '@/store/modules/user-comments';
import articleCommentsModule from '@/store/modules/article-comments';
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
		userComments: userCommentsModule,
		articleComments: articleCommentsModule,
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
		setAppAsReady(context) {
			context.commit('setAppIsReady', true);
		}
	}
});
