<template>
	<div class="article-page">
		Article

		{{ article }}
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState('articles', [
				'article'
			])
		},
		created() {
			this.getArticleData();
		},
		methods: {
			...mapActions('articles', [
				'getArticle'
			]),
			getArticleData() {
				this.getArticle(this.$route.params.id).then((res) => {
					console.log(res);
					this.loading = false;
				});
			}
		}
	};
</script>

<style scoped lang="scss">

</style>
