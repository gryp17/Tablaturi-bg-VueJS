<template>
	<div class="home-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			{{ articles }}

			<div class="articles-link-wrapper">
				<router-link :to="{name: 'articles'}" class="red">
					Виж всички новини
				</router-link>
			</div>
		</template>
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
			...mapState('articles', [
				'articles'
			])
		},
		created() {
			this.getArticles(0).then(() => {
				this.loading = false;
			});
		},
		methods: {
			...mapActions('articles', [
				'getArticles'
			])
		}
	};
</script>

<style scoped lang="scss">
	.home-page {
		.articles-link-wrapper {
			margin-top: 15px;
			margin-bottom: 5px;
			text-align: center;
		}
	}
</style>
