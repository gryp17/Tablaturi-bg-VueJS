<template>
	<div class="tab-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			{{ tab }}
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
			...mapState('tabs', [
				'tab'
			])
		},
		created() {
			this.getTabData();
		},
		methods: {
			...mapActions('tabs', [
				'getTab'
			]),
			/**
			 * Fetches the tab data
			 */
			getTabData() {
				return this.getTab(this.$route.params.id).then((res) => {
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
