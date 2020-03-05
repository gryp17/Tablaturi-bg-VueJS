import Vue from 'vue';
import ArticleHttpService from '@/services/article';

export default {
	namespaced: true,
	state: {},
	actions: {
		addArticle(context, data) {
			return ArticleHttpService.addArticle(data).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `add article failed - ${error}`
				});
			});
		}
	}
};
