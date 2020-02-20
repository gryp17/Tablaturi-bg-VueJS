<template>
	<div>
		user favourites
	</div>
</template>

<script>
	export default {
		created() {
			setTimeout(() => {
				this.$emit('ready');
			}, 500);
		}
	};
</script>
