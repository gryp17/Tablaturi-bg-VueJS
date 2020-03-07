<template>
	<div class="edit-article-page">
		<LoadingIndicator v-if="loading" />
		<ArticleForm v-else :article="article" />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ArticleForm from '@/components/ArticleForm';

	export default {
		components: {
			ArticleForm
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('articles', [
				'article'
			]),
		},
		created() {
			this.getArticleData();
		},
		methods: {
			...mapActions('articles', [
				'getArticle'
			]),
			/**
			 * Fetches the article data
			 */
			getArticleData() {
				this.getArticle(this.$route.params.id).then((res) => {
					const data = res.data;

					if (data && data.ID) {
						this.loading = false;
					} else {
						this.$router.push({ name: 'not-found' });
					}
				});
			}
		}
	};
</script>
