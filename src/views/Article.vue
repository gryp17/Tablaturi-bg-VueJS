<template>
	<div class="article-page">
		<LoadingIndicator v-if="loading" />
		<div v-else class="article-wrapper">
			<div class="article-header">
				<div class="red-block">
					{{ date }}
				</div>

				<div class="red-block">
					Преглеждания: {{ article.views }}
				</div>

				<div class="author">
					от
					<router-link
						:to="authorLink"
						:title="`Виж профила на ${article.username}`"
						class="red"
					>
						{{ article.username }}
					</router-link>
				</div>

				<div class="clearfix"></div>

				<router-link v-if="isAdmin" :to="editArticleLink">
					<FormButton class="edit-btn">
						<i class="fas fa-pencil-alt"></i>
						Редактирай
					</FormButton>
				</router-link>
			</div>

			<div class="clearfix"></div>

			<div class="article-content">
				<img class="article-image" :src="imageUrl" />
				<h4 class="title">
					{{ article.title }}
				</h4>
				<div class="content" v-html="content"></div>
			</div>

			<div class="clearfix"></div>

			<ShareWidget />

			<CommentsWidget
				:object-id="article.ID"
				type="article"
			/>

		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';

	import ShareWidget from '@/components/ShareWidget';
	import CommentsWidget from '@/components/comments/CommentsWidget';

	export default {
		components: {
			ShareWidget,
			CommentsWidget
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapGetters('auth', [
				'isLoggedIn',
				'isAdmin'
			]),
			...mapState('articles', [
				'article'
			]),
			...mapState([
				'CDN_URL'
			]),
			date() {
				return this.$options.filters.date(this.article.date, 'YYYY-MM-DD в HH:mm:ss');
			},
			authorLink() {
				return {
					name: 'profile',
					params: {
						id: this.article.author_ID
					}
				};
			},
			editArticleLink() {
				return {
					name: 'edit-article',
					params: {
						id: this.article.ID
					}
				};
			},
			imageUrl() {
				return `${this.CDN_URL}/articles/${this.article.picture}`;
			},
			content() {
				let content = this.article.content;
				content = content.replace(/(\r\n|\r|\n)/g, '<br/>');
				content = this.$options.filters.emoticons(content);
				return content;
			}
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
				return this.getArticle(this.$route.params.id).then((res) => {
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

<style lang="scss">
	.article-page {

		.article-wrapper {
			.article-header {
				padding-top: 5px;
				border-top: 2px solid lighten($red, 10%);

				.red-block {
					float: left;
					padding: 2px 10px;
					background-color: lighten($red, 10%);
					color: $white;

					& + .red-block {
						margin-left: 5px;
					}
				}

				.author {
					float: right;
				}

				.edit-btn {
					float: right;
					margin-top: 5px;
				}
			}

			.article-content {
				.article-image {
					float: left;
					width: 250px;
					margin: 0px 20px 15px 0px;
				}

				.title {
					margin-top: 20px;
					color: $blue;
					line-height: 25px;
				}

				.content {
					margin-top: 20px;
					text-align: justify;

					a {
						@extend .red;
					}

					.emoticon {
						width: 25px;
						height: 25px;
					}
				}
			}
		}
	}
</style>
