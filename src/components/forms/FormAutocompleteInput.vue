<template>
	<!-- pass all props and listeners down do the FormInput component -->
	<FormInput
		v-bind="$attrs"
		v-on="$listeners"
		class="form-autocomplete-input"
		ref="input"
	/>
</template>

<script>
	import $ from 'jquery';
	import 'jquery-ui/themes/base/core.css';
	import 'jquery-ui/themes/base/menu.css';
	import 'jquery-ui/themes/base/theme.css';
	import 'jquery-ui/themes/base/autocomplete.css';
	import 'jquery-ui/ui/widgets/autocomplete';

	import { mapActions } from 'vuex';

	export default {
		props: {
			field: {
				type: String,
				required: true,
				validator(value) {
					return ['band', 'song'].includes(value);
				}
			},
			band: {
				type: String,
				default: ''
			}
		},
		mounted() {
			const self = this;
			const input = $(this.$refs.input.$el).find('input');

			//initialize the autocomplete plugin
			input.autocomplete({
				minLength: 1,
				delay: 300,
				source(request, responseCallback) {
					const params = {
						type: self.field,
						term: request.term,
						band: self.band
					};

					self.autocomplete(params).then((res) => {
						//pass the data to the jqueryUI responseCallback function
						responseCallback(res.data);
					});
				},
				//on focus change the model value manually by calling the input event with the selected/focused value
				focus(event, ui) {
					self.$listeners.input(ui.item.value);
				}
			});
		},
		methods: {
			...mapActions('tabs', [
				'autocomplete'
			])
		}
	};
</script>

<style lang="scss">
	.ui-autocomplete {
		.ui-state-hover, .ui-state-active {
			background: $gray-light;
			border-color: $gray-dark;
			color: $text-color;
		}
	}
</style>
