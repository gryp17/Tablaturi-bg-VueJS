<template>
	<div>
		user profile
	</div>
</template>

<script>
	export default {
		created() {
			setTimeout(() => {
				this.$emit('ready');
			}, 800);
		}
	};
</script>
