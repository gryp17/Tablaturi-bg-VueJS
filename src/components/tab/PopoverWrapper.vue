<template>
	<div class="popover-wrapper">
		<slot v-if="!disabled" name="button">
			Button goes in here
		</slot>
		<PopoverButton
			v-else
			trigger="focus"
			placement="top"
		>
			<template v-slot:button>
				<slot name="button">
					Button goes in here
				</slot>
			</template>
			<template v-slot:content>
				<slot name="content">
					Content / error message goes in here
				</slot>
			</template>
		</PopoverButton>
	</div>
</template>

<script>
	import PopoverButton from '@/components/PopoverButton';

	export default {
		components: {
			PopoverButton
		},
		props: {
			disabled: Boolean
		}
	};
</script>

<style scoped lang="scss">
	.popover-wrapper {
		display: inline-block;
	}
</style>
