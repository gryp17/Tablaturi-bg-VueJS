import Vue from 'vue';
import ArticleHttpService from '@/services/article';

export default {
	namespaced: true,
	state: {
		article: null,
		articles: [],
		total: 0,
		page: 0,
		perPage: 6
	},
	mutations: {
		setArticle(state, article) {
			state.article = article;
		},
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
		updateArticle(context, data) {
			return ArticleHttpService.updateArticle(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `update article failed - ${error}`
				});
			});
		},
		getArticles(context, page) {
			const limit = context.state.perPage;
			const offset = page * limit;

			if (page === 0) {
				context.commit('setArticles', []);
			}

			return ArticleHttpService.getArticles(limit, offset).then((res) => {
				let articles = res.data.results;

				if (page > 0) {
					articles = [...context.state.articles, ...articles];
				}

				context.commit('setArticles', articles);
				context.commit('setTotal', res.data.total);
				context.commit('setPage', page);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get articles failed - ${error}`
				});
			});
		},
		getArticle(context, id) {
			context.commit('setArticle', null);

			return ArticleHttpService.getArticle(id).then((res) => {
				if (res.data && res.data.ID) {
					context.commit('setArticle', res.data);
				}

				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `get article failed - ${error}`
				});
			});
		}
	}
};
