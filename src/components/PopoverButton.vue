<template>
	<div class="popover-button">
		<a ref="popover" class="popover-trigger" tabindex="0" role="button" data-toggle="popover">
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
			},
			placement: {
				type: String,
				default: 'right',
				validator(value) {
					return ['auto', 'top', 'bottom', 'left', 'right'].includes(value);
				}
			}
		},
		mounted() {
			$(this.$refs.popover).popover({
				trigger: this.trigger,
				placement: this.placement,
				content: $(this.$refs.content),
				html: true
			});
		}
	};
</script>

<style scoped lang="scss">
	.popover-button {
		.popover-trigger {
			display: block;
			color: $text-color;
		}

		.popover-content {
			display: none;
		}
	}
</style>
