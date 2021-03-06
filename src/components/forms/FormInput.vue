<template>
	<div class="form-input form-group">
		<FormFloatingLabel :visible="showLabel">
			{{ placeholder }}
		</FormFloatingLabel>
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
				:disabled="disabled"
				v-on="{
					...$listeners,
					input: onInput,
					focus: onFocus,
					blur: onBlur
				}"
			/>
			<textarea
				v-if="tag === 'textarea'"
				:value="value"
				:class="['form-control', className, {monospaced}, {'has-error': error}]"
				:name="name"
				:placeholder="placeholder"
				:rows="rows"
				:disabled="disabled"
				v-on="{
					...$listeners,
					input: onInput,
					focus: onFocus,
					blur: onBlur
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
	import FormFloatingLabel from '@/components/forms/FormFloatingLabel';
	import FormInputError from '@/components/forms/FormInputError';

	export default {
		components: {
			FormFloatingLabel,
			FormInputError
		},
		props: {
			floatingLabel: Boolean,
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
			rows: {
				type: Number,
				default: 3
			},
			disabled: {
				type: Boolean,
				default: false
			},
			monospaced: {
				type: Boolean,
				defalt: false
			},
			name: String,
			error: String
		},
		data() {
			return {
				focused: false,
			};
		},
		computed: {
			showLabel() {
				return this.floatingLabel && this.focused && this.value;
			}
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(e) {
				this.$emit('input', e.target.value);
			},
			/**
			 * Intercepts the focus event and updates the focused parameter
			 * @param {Object} e
			 */
			onFocus(e) {
				this.focused = true;

				//call the passed focus event (if provided)
				if (this.$listeners.focus) {
					this.$listeners.focus(e);
				}
			},
			/**
			 * Intercepts the blur event and updates the focused parameter
			 * @param {Object} e
			 */
			onBlur(e) {
				this.focused = false;

				//call the passed blur event (if provided)
				if (this.$listeners.blur) {
					this.$listeners.blur(e);
				}
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

			&:focus {
				box-shadow: none;
				border-color: $blue-lighter;
			}

			&.monospaced {
				font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
				font-size: 13px;
			}

			&.has-error {
				border-color: $red;
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.7;
			}
		}

		textarea {
			&.form-control {
				padding: 10px;
			}
		}
	}
</style>
