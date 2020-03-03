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
				:current-page="currentPage"
				@change-page="getCommentsByPage"
			/>
		</template>
		<h5 v-else class="no-comments">
			Няма коментари
		</h5>
	</div>
</template>

<script>
	import Comment from '@/components/Comment';
	import Pagination from '@/components/Pagination';

	export default {
		components: {
			Comment,
			Pagination
		},
		props: {
			comments: Array,
			total: Number,
			perPage: Number,
			currentPage: Number
		},
		computed: {
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			}
		},
		methods: {
			getCommentsByPage(page) {
				this.$emit('get-comments-by-page', page);
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
