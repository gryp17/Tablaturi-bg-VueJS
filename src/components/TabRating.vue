<template>
	<div class="tab-rating">
		<div v-for="index in 5" :key="index" :class="['star', {empty: index > stars}]"></div>
	</div>
</template>

<script>
	export default {
		props: {
			rating: Number
		},
		computed: {
			stars() {
				return Math.round(this.rating);
			}
		}
	};
</script>

<style scoped lang="scss">
	.tab-rating {
		display: flex;

		.star {
			margin-bottom: 2px;
			margin-right: 1px;
			height: 15px;
			width: 15px;
			background-size: 15px 15px;
			background-image: url(/img/icons/star.png);

			&.empty {
				background-image: url(/img/icons/star-empty.png);
			}
		}
	}
</style>
