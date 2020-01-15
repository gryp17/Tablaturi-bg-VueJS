<template>
	<button
		:class="['form-button', className]"
		:type="type"
		v-on="{
			...$listeners
		}"
	>
		<slot>Click me</slot>
	</button>
</template>

<script>
	export default {
		props: {
			className: String,
			type: {
				type: String,
				default: 'button'
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-button {
		padding: 6px 20px;
		border: none;
		background-color: $red;
		color: $white;
		transition: all 0.4s ease-in-out;
		font-size: 16px;

		&:hover, &:active, &:focus {
			background-color: darken($red, 15%);
		}
	}
</style>
