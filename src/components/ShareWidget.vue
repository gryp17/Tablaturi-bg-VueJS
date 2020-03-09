<template>
	<div class="share-widget">
		Сподели в:
		<RedLine />
		<span class="st_fblike_hcount" displayText="Facebook Like"></span>
		<span class="st_facebook_hcount" displayText="Facebook"></span>
		<span class="st_twitter_hcount" displayText="Tweet"></span>
	</div>
</template>

<script>
	import RedLine from '@/components/RedLine';

	export default {
		components: {
			RedLine
		},
		mounted() {
			window.stButtons.makeButtons();
		}
	};
</script>

<style scoped lang="scss">
	.share-widget {
		margin-top: 20px;

		.red-line {
			margin: 10px 0px;
		}
	}
</style>
