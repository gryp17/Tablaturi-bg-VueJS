<template>
	<div class="articles-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			<PageTitle>
				Новини
			</PageTitle>

			<ArticlesList>
				<ArticleCard
					v-for="article in articles"
					:key="article.ID"
					:data="article"
				/>
			</ArticlesList>

			<FormButton
				v-show="hasMoreArticles"
				@click="loadMoreArticles"
				class="load-more-btn"
			>
				Покажи още новини
			</FormButton>
		</template>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapState, mapActions } from 'vuex';

	import ArticlesList from '@/components/ArticlesList';
	import ArticleCard from '@/components/ArticleCard';

	export default {
		components: {
			ArticleCard,
			ArticlesList
		},
		data() {
			return {
				loading: true,
				lazyLoading: false
			};
		},
		computed: {
			...mapState('articles', [
				'articles',
				'page',
				'total'
			]),
			hasMoreArticles() {
				return this.articles.length < this.total;
			}
		},
		created() {
			this.getArticles(0).then(() => {
				this.loading = false;
			});

			$(window).on('scroll', this.onWindowScroll);
		},
		destroyed() {
			$(window).off('scroll', this.onWindowScroll);
		},
		methods: {
			...mapActions('articles', [
				'getArticles'
			]),
			/**
			 * Handle window scroll and lazy load more articles
			 */
			onWindowScroll() {
				const scrollTop = $(window).scrollTop();
				const bodyHeight = $('body').height() - 1000;

				//if there is no other lazy loading in progress and there are more articles to be loaded
				if (!this.lazyLoading && this.hasMoreArticles && scrollTop > bodyHeight) {
					this.loadMoreArticles();
				}
			},
			/**
			 * Lazy loads the rest of the articles
			 */
			loadMoreArticles() {
				this.lazyLoading = true;

				this.getArticles(this.page + 1).then(() => {
					this.lazyLoading = false;
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.articles-page {
		.load-more-btn {
			display: block;
			margin: 15px auto 5px auto;
		}
	}
</style>
