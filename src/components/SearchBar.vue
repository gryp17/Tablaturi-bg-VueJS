<template>
	<div class="search-bar">
		Search bar
	</div>
</template>

<style scoped lang="scss">
	.search-bar {
		position: relative;
		margin-left: -15px;
		margin-right: -15px;
		padding: 10px 0px;
		background-color: $blue;

		&:before, &:after {
			content: "";
			position: absolute;
			z-index: -1;
			width: 0px;
			height: 0px;
			bottom: -20px;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid darken($blue, 10%);
		}

		&:before{
			left: 0;
		}

		&:after {
			right: 0;
		}
	}
</style>
