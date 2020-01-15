<template>
	<header class="header">
		<MainMenu />

		header content
	</header>
</template>

<script>
	import MainMenu from '@/components/MainMenu';

	export default {
		components: {
			MainMenu
		}
	};
</script>


<style scoped lang="scss">
	.header {
		background-color: $gray;
	}
</style>
