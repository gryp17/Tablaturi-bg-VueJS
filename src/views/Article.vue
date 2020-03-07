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

			<div>
				<hr/>
				##### TODO: share stuff goes here
				<hr/>
			</div>

			<CommentsList
				:comments="comments"
				:total="total"
				:current-page="page"
				:per-page="perPage"
				@get-comments-by-page="getCommentsByPage"
			/>

			<AddCommentBox
				:logged-in="isLoggedIn"
				:error="errors.content"
				@focus="clearError"
				@submit="submitComment"
				ref="commentBox"
			/>

		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import { mapState, mapGetters, mapActions } from 'vuex';

	import AddCommentBox from '@/components/AddCommentBox';
	import CommentsList from '@/components/CommentsList';

	const formName = 'addComment';

	export default {
		components: {
			AddCommentBox,
			CommentsList
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
			...mapState('articleComments', [
				'comments',
				'total',
				'page',
				'perPage'
			]),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			date() {
				return moment(this.article.date).format('YYYY-MM-DD в HH:mm:ss');
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
			this.getArticleData().then(() => {
				this.getCommentsByPage(0);
			});
			this.resetFormErrors(formName);
		},
		methods: {
			...mapActions('articles', [
				'getArticle'
			]),
			...mapActions('articleComments', [
				'getArticleComments',
				'addArticleComment'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
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
			},
			/**
			 * Fetches the comments for the specified page
			 * @param {Number} page
			 */
			getCommentsByPage(page) {
				this.getArticleComments({
					articleId: this.article.ID,
					page
				});
			},
			/**
			 * Submits the article comment
			 * @param {String} content
			 */
			submitComment(content) {
				const params = {
					articleId: this.article.ID,
					content
				};

				this.addArticleComment(params).then((res) => {
					const data = res.data;

					if (data.success) {
						this.$refs.commentBox.reset();
						this.getCommentsByPage(0);
					} else if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					}
				});
			},
			/**
			 * Clears the form errors related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: formName,
					field
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
