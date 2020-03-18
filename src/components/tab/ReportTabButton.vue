<template>
	<FormButton
		@click="reportTab"
		outline
		class="report-tab-button"
		ref="button"
	>
		<i class="far fa-thumbs-down"></i>
		Докладвай
	</FormButton>
</template>

<script>
	export default {
		props: {
			disabled: Boolean
		},
		methods: {
			/**
			 * Emits the click event
			 */
			reportTab() {
				if (this.disabled) {
					return;
				}
				this.$emit('click');
			}
		}
	};
</script>
