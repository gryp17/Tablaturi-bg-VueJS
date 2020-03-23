<template>
	<div class="share-widget">
		Сподели в:
		<RedLine />

		<FormButton @click="share" title="Сподели" class="fb-share-btn">
			<i class="fab fa-facebook-square"></i>
			Facebook
		</FormButton>
	</div>
</template>

<script>
	import RedLine from '@/components/RedLine';

	export default {
		components: {
			RedLine
		},
		methods: {
			/**
			 * Opens the facebook share dialog
			 */
			share() {
				const url = window.location.href;
				window.open(`https://facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'location=yes,height=500,width=520,scrollbars=yes,status=yes');
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

		.fb-share-btn {
			padding: 2px 10px;
			font-size: 13px;
			background-color: #3b5997;
		}
	}
</style>
