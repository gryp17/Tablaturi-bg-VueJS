<template>
	<div class="comments-widget">
		<CommentsList
			@get-comments="getCommentsByPage"
		/>

		<AddCommentBox
			:add-comment="addComment"
		/>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	import CommentsList from '@/components/comments/CommentsList';
	import AddCommentBox from '@/components/comments/AddCommentBox';

	export default {
		components: {
			CommentsList,
			AddCommentBox
		},
		props: {
			type: {
				type: String,
				validator(value) {
					return ['user', 'article', 'tab'].includes(value);
				}
			},
			objectId: {
				type: Number,
				required: true
			}
		},
		computed: {
			actionsMap() {
				return {
					user: {
						add: this.addUserComment,
						get: this.getUserComments
					},
					article: {
						add: this.addArticleComment,
						get: this.getArticleComments
					},
					tab: {
						add: this.addTabComment,
						get: this.getTabComments
					}
				};
			},
		},
		methods: {
			...mapActions('comments', [
				'addUserComment',
				'getUserComments',
				'addArticleComment',
				'getArticleComments',
				'addTabComment',
				'getTabComments',
			]),
			/**
			 * Fetches the comments for the passed page
			 * @param {Number} page
			 */
			getCommentsByPage(page) {
				const action = this.actionsMap[this.type];
				const params = {
					id: this.objectId,
					page
				};

				action.get(params);
			},
			/**
			 * Adds new comment
			 * @param {String} content
			 * @returns {Promise}
			 */
			addComment(content) {
				const action = this.actionsMap[this.type];

				const params = {
					id: this.objectId,
					content
				};

				return action.add(params).then((res) => {
					const data = res.data;

					if (data.success) {
						//refresh the comments list
						this.getCommentsByPage(0);
					}

					return res;
				});
			}
		}
	};
</script>
