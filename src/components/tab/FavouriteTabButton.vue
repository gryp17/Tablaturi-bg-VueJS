<template>
	<FormButton
		@click="toggleFavouriteStatus"
		:outline="!favourite"
		class="favourite-tab-button"
		ref="button"
	>
		<i class="fas fa-heart"></i>
		{{ text }}
	</FormButton>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			favourite: Boolean,
			disabled: Boolean
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
				if (this.disabled) {
					return;
				}

				//manually remove focus from the button
				$(this.$refs.button.$el).blur();
				this.$emit('click', !this.favourite);
			}
		}
	};
</script>
