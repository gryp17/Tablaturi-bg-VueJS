<template>
	<div v-if="ready" class="tabs-stats">
		<div>
			<strong>{{ totalTabs.gp }}</strong> Guitar Pro таблатури
		</div>
		<div>
			<strong>{{ totalTabs.text }}</strong> Текстови таблатури
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState('tabs', [
				'totalTabs'
			]),
			ready() {
				return this.totalTabs && (this.totalTabs.gp + this.totalTabs.text > 0);
			}
		}
	};
</script>

<style scoped lang="scss">
	.tabs-stats {
		padding: 10px;
		text-align: right;
	}
</style>
