<template>
	<FormButton
		@click="toggleFavouriteStatus"
		:outline="!favourite"
		class="favourite-tab-button"
	>
		<i class="fas fa-heart"></i>
		{{ text }}
	</FormButton>
</template>

<script>
	export default {
		props: {
			favourite: Boolean
		},
		computed: {
			text() {
				return this.favourite ? 'Премахни от любими' : 'Добави в любими';
			}
		},
		methods: {
			/**
			 * Emits the change event with the toggled favourite status
			 */
			toggleFavouriteStatus() {
				this.$emit('change', !this.favourite);
			}
		}
	};
</script>
