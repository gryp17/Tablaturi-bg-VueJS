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
			v-on="{
				...$listeners,
				input: onInput
			}"
		/>
	</div>
</template>

<script>
	import Datepicker from 'vuejs-datepicker';
	import { bg } from 'vuejs-datepicker/dist/locale';

	export default {
		components: {
			Datepicker
		},
		props: {
			value: Date,
			name: String,
			placeholder: String,
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

<style scoped>
	.form-datepicker {

	}
</style>
