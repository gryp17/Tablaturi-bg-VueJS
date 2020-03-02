<template>
	<div class="comments-list">
		comments list

		{{ comments }}

		<Comment
			v-for="comment in comments"
			:key="comment.ID"
			:data="comment"
		/>

		<Pagination
			:total-pages="totalPages"
			:current-page="currentPage"
			@change-page="getCommentsByPage"
		/>
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

</style>
