<template>
	<label class="form-dropdown">
		<select
			:value="value"
			:name="name"
			v-on="{
				...$listeners,
				input: onInput
			}"
		>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</label>
</template>

<script>
	export default {
		props: {
			options: Array,
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
		position: relative;
		margin-bottom: 0px;

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
			padding: 10px 30px 9px 5px;
			border-radius: 2px;
			border: 1px solid $blue;
			color: $blue;
			background-color: $gray;
			appearance: none;
			outline: none;
		}
	}
</style>
