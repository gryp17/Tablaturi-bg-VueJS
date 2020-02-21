<template>
	<div class="popover-button">
		<a ref="popover" tabindex="0" role="button" data-toggle="popover">
			<slot name="button">
				Icon placeholder
			</slot>
		</a>

		<div ref="content" class="popover-content">
			<slot name="content">
				Hi there
			</slot>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			trigger: {
				type: String,
				default: 'hover',
				validator(value) {
					return ['hover', 'click', 'focus'].includes(value);
				}
			}
		},
		mounted() {
			$(this.$refs.popover).popover({
				trigger: this.trigger,
				content: $(this.$refs.content),
				html: true
			});
		}
	};
</script>

<style scoped lang="scss">
	.popover-button {
		display: inline-block;

		.popover-content {
			display: none;
		}
	}
</style>
