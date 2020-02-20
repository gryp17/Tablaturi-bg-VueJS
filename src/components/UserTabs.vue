<template>
	<div>
		user tabs
	</div>
</template>

<script>
	export default {
		created() {
			setTimeout(() => {
				this.$emit('ready');
			}, 700);
		}
	};
</script>
