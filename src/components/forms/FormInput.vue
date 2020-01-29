<template>
	<div class="form-input form-group">
		<div class="input-group">
			<slot name="input-group-prepend"></slot>

			<!--
				v-on automatically propagates all events up to the parent
				so the @focus and @keyup events can be set there.
				It doesn't work together with v-model that's why the @input event and :value prop need to be set manually
			-->
			<input
				v-if="tag === 'input'"
				:value="value"
				:class="['form-control', className, {'has-error': error}]"
				:type="type"
				:name="name"
				:placeholder="placeholder"
				v-on="{
					...$listeners,
					input: onInput
				}"
			/>
			<textarea
				v-if="tag === 'textarea'"
				:value="value"
				:class="['form-control', className, {'has-error': error}]"
				:name="name"
				:placeholder="placeholder"
				v-on="{
					...$listeners,
					input: onInput
				}"
			/>

			<slot name="input-group-append"></slot>
		</div>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import FormInputError from '@/components/forms/FormInputError';

	export default {
		components: {
			FormInputError
		},
		props: {
			tag: {
				type: String,
				default: 'input',
				validator(value) {
					return ['input', 'textarea'].includes(value);
				}
			},
			value: String,
			className: String,
			type: String,
			placeholder: String,
			name: String,
			error: String
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(e) {
				this.$emit('input', e.target.value);
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-input{
		position: relative;

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
