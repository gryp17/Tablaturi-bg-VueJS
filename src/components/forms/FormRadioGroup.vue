<template>
	<div :class="['form-radio-group form-group', { horizontal }]">
		<label class="title">
			{{ title }}
		</label>

		<div v-for="(value, key) in items" :key="key" class="radio-item">
			<input
				:id="`radio-${key}`"
				:value="value"
				type="radio"
				:checked="isChecked(key)"
				@change="onChange(key)"
			/>
			<label :for="`radio-${key}`" class="radio-label">
				{{ value }}
			</label>
		</div>
	</div>
</template>

<script>
	export default {
		//"rename" the v-model value and @input event in order not to confuse them with the items values
		model: {
			prop: 'modelValue',
			event: 'change'
		},
		props: {
			modelValue: String,
			title: String,
			items: Object,
			horizontal: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			/**
			 * Checks if the radio button should be checked or not
			 * @param {String} value
			 */
			isChecked(value) {
				return value === this.modelValue;
			},
			/**
			 * Propagates the "change" event back to the parent (needed because of v-model)
			 * @param {String} value
			*/
			onChange(value) {
				this.$emit('change', value);
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-radio-group {
		.title {
			margin-bottom: 5px;
		}

		.radio-label {
			margin-left: 5px;
			margin-bottom: 0;
			cursor: pointer;
		}

		&.horizontal {
			.title {
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 0px;
			}

			.radio-item {
				display: inline-block;

				.radio-label {
					margin-right: 10px;
				}
			}
		}
	}
</style>
