<template>
	<div class="form-dropdown form-group">
		<label v-if="label">
			{{ label }}
		</label>

		<div class="form-dropdown-wrapper">
			<select
				:value="value"
				:name="name"
				v-on="{
					...$listeners,
					input: onInput
				}"
			>
				<option
					v-for="(optionLabel, key) in options"
					:key="key"
					:value="key"
				>
					{{ optionLabel }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			label: String,
			options: Object,
			value: String,
			name: String
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
	.form-dropdown {
		display: block;

		.form-dropdown-wrapper {
			position: relative;

			&:after {
				position: absolute;
				content: '';
				width: 14px;
				height: 14px;
				padding: 0 0 2px;
				background: url('/img/icons/arrow.png');
				background-size: 100%;
				transform: rotate(90deg);
				filter: brightness(30%);
				right: 10px;
				top: 14px;
				pointer-events: none;
			}

			select {
				display: block;
				width: 100%;
				padding: 10px 30px 9px 5px;
				border-radius: 2px;
				border: 1px solid $blue;
				color: $blue;
				background-color: $gray;
				appearance: none;
				outline: none;
			}
		}
	}
</style>
