import Vue from 'vue';
import ArticleHttpService from '@/services/article';

export default {
	namespaced: true,
	state: {
		articles: [],
		total: 0,
		page: 0,
		perPage: 6
	},
	mutations: {
		setArticles(state, articles) {
			state.articles = articles;
		},
		setTotal(state, total) {
			state.total = total;
		},
		setPage(state, page) {
			state.page = page;
		}
	},
	actions: {
		addArticle(context, data) {
			return ArticleHttpService.addArticle(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article failed - ${error}`
				});
			});
		},
		getArticles(context, page) {
			const limit = context.state.perPage;
			const offset = page * limit;

			return ArticleHttpService.getArticles(limit, offset).then((res) => {
				context.commit('setArticles', res.data.results);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get articles failed - ${error}`
				});
			});
		}
	}
};
