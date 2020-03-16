<template>
	<div class="tabs-page">
		<LoadingIndicator v-if="!done" />
		<div v-else class="tables-wrapper">
			<TopTabsTable
				:tabs="popular"
				type="popular"
			/>

			<TopTabsTable
				:tabs="liked"
				type="liked"
			/>

			<TopTabsTable
				:tabs="latest"
				type="latest"
			/>

			<TopTabsTable
				:tabs="commented"
				type="commented"
			/>

		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import TopTabsTable from '@/components/TopTabsTable';

	export default {
		components: {
			TopTabsTable
		},
		data() {
			return {
				done: false
			};
		},
		computed: {
			...mapState('tabs', {
				popular: state => state.most.popular,
				liked: state => state.most.liked,
				latest: state => state.most.latest,
				commented: state => state.most.commented
			}),
		},
		created() {
			Promise.all([
				this.getMost('popular'),
				this.getMost('liked'),
				this.getMost('latest'),
				this.getMost('commented')
			]).then(() => {
				this.done = true;
			});
		},
		methods: {
			...mapActions('tabs', [
				'getMost'
			])
		}
	};
</script>

<style lang="scss">
	.tabs-page {
		.tables-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.top-tabs-table {
				margin: 10px;
				width: 47%;
			}
		}
	}
</style>
