<template>
	<div class="form-datepicker">
		<Datepicker
			:value="value"
			:name="name"
			:placeholder="placeholder"
			:language="language"
			:disabled-dates="disabledDates"
			:full-month-name="true"
			:monday-first="true"
			:format="format"
			:input-class="['form-control', {'has-error': error}]"
			v-on="{
				...$listeners,
				input: onInput
			}"
			ref="datepicker"
		/>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Datepicker from 'vuejs-datepicker';
	import { bg } from 'vuejs-datepicker/dist/locale';
	import FormInputError from '@/components/forms/FormInputError';

	let input;

	export default {
		components: {
			Datepicker,
			FormInputError
		},
		props: {
			value: Date,
			name: String,
			placeholder: String,
			error: String,
			format: {
				type: String,
				default: 'dd MMMM yyyy'
			},
			disabledDates: {
				type: Object,
				//disable all future dates by default
				default: () => {
					return {
						from: new Date()
					};
				}
			}
		},
		computed: {
			language() {
				return bg;
			}
		},
		mounted() {
			//need to manually bind/unbind focus because vuejs-datepicker doesn't provide a working focus event...
			input = $(this.$refs.datepicker.$el).find('input');
			input.on('focus', this.$listeners.focus);
		},
		destroyed() {
			input.off('focus', this.$listeners.focus);
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(selectedDate) {
				this.$emit('input', selectedDate);
			}
		}
	};
</script>

<style lang="scss">
	.form-datepicker {
		position: relative;
		margin-bottom: 16px;

		.form-control {
			padding: 20px 10px;
			border-radius: 0px;
			background-color: $gray;
			border-color: transparent;
			font-size: inherit;

			&.has-error {
				border-color: $red;
			}

			&:focus {
				box-shadow: none;
				border-color: $blue-lighter;
			}
		}
	}
</style>
