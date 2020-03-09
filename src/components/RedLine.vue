<template>
	<div :class="['red-line', {small, big}]"></div>
</template>

<script>
	export default {
		props: {
			small: {
				type: Boolean,
				default: true
			},
			big: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped lang="scss">
	.red-line {
		background: linear-gradient(to right, $red 0%, $red 49%, $white 100%);

		&.small {
			height: 1px;
		}

		&.big {
			height: 3px;
		}
	}
</style>
