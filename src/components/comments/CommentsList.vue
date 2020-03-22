<template>
	<div class="comments-list">
		<template v-if="total > 0">
			<h5>Коментари:</h5>

			<Comment
				v-for="comment in comments"
				:key="comment.ID"
				:data="comment"
			/>

			<Pagination
				v-show="totalPages > 1"
				:total-pages="totalPages"
				:current-page="page"
				@change-page="getCommentsByPage"
			/>
		</template>
		<h5 v-else class="no-comments">
			Няма коментари
		</h5>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import Comment from '@/components/comments/Comment';
	import Pagination from '@/components/Pagination';

	export default {
		components: {
			Comment,
			Pagination
		},
		computed: {
			...mapState('comments', [
				'comments',
				'total',
				'page',
				'perPage'
			]),
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			}
		},
		created() {
			this.getCommentsByPage(0);
		},
		methods: {
			/**
			 * Fetches the comments for the passed page
			 * @param {Number} page
			 */
			getCommentsByPage(page) {
				this.$emit('get-comments', page);
			}
		}
	};
</script>

<style scoped lang="scss">
	.comments-list {
		margin-top: 30px;
		margin-bottom: 15px;

		.no-comments {
			text-align: center;
		}
	}
</style>
