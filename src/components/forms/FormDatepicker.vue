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
		/>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import Datepicker from 'vuejs-datepicker';
	import { bg } from 'vuejs-datepicker/dist/locale';
	import FormInputError from '@/components/forms/FormInputError';

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
