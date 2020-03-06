<template>
	<div class="articles-list">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	.articles-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.article-box {
			margin: 9px;
			width: 47%;
		}
	}
</style>
