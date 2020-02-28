<template>
	<div class="comments-list">
		comments list

		{{ comments }}

		<hr />

		<button @click="getCommentsByPage(0)">
			0
		</button>

		<button @click="getCommentsByPage(1)">
			1
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			comments: Array,
			total: Number,
			perPage: Number,
			currentPage: Number
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
