<template>
	<div class="status-message">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	.status-message {
		font-size: 18px;
		text-align: center;

		img {
			width: 100px;
			margin-top: 15px;
			margin-bottom: 15px;
		}
	}
</style>
