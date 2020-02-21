<template>
	<i :class="['gender-icon', icon]"></i>
</template>

<script>
	export default {
		props: {
			gender: {
				type: String,
				default: 'M'
			}
		},
		computed: {
			icon() {
				return this.gender === 'M' ? 'fas fa-mars' : 'fas fa-venus';
			}
		}
	};
</script>

<style scoped lang="scss">
	.gender-icon {
		margin-top: -5px;
		font-size: 22px;

		&.fa-mars {
			color: $gender-male;
		}

		&.fa-venus {
			color: $gender-female;
		}
	}
</style>
