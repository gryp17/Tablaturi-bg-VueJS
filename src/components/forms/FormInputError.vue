<template>
	<div class="form-input-error">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	.form-input-error {
		position: absolute;
		font-size: 10px;
		color: $red;
	}
</style>
