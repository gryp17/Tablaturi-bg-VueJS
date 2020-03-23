<template>
	<div class="share-widget">
		Сподели в:
		<RedLine />
		<span class="st_fblike_hcount" displayText="Facebook Like"></span>
		<span class="st_facebook_hcount" displayText="Facebook"></span>
		<span class="st_twitter_hcount" displayText="Tweet"></span>

		<button @click="share">
			Share
		</button>
	</div>
</template>

<script>
	import RedLine from '@/components/RedLine';

	export default {
		components: {
			RedLine
		},
		mounted() {
			if (window.stButtons && window.stButtons.makeButtons) {
				window.stButtons.makeButtons();
			}
		},
		methods: {
			share() {
				const url = window.location.href;
				//TODO: remove this
				console.log(url);
				window.open(`http://facebook.com/sharer/sharer.php?u=${url}`, '_blank');
			}
		}
	};
</script>

<style scoped lang="scss">
	.share-widget {
		margin-top: 20px;
		clear: both;

		.red-line {
			margin: 10px 0px;
		}
	}
</style>
