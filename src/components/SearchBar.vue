<template>
	<div class="search-bar">

		<FormInput
			v-model="band"
			@keyup.enter="search()"
			type="text"
			name="band"
			placeholder="Група"
		></FormInput>

		<FormInput
			v-model="song"
			@keyup.enter="search()"
			type="text"
			name="song"
			placeholder="Песен"
		></FormInput>

		<FormDropdown
			v-model="type"
			:options="tabTypes"
			name="type"
		/>

		<FormButton @click="search()">
			Търси
		</FormButton>

	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		//TODO: add autocomplete for the band and song fields
		data() {
			return {
				band: '',
				song: '',
				type: 'all'
			};
		},
		computed: {
			...mapState([
				'TAB_TYPES'
			]),
			tabTypes() {
				const labelsMap = {
					tab: 'Таблатури',
					chord: 'Акорди',
					bass: 'Бас',
					gp: 'Guitar Pro'
				};

				const types = this.TAB_TYPES.map((value) => {
					return {
						label: labelsMap[value],
						value
					};
				});

				types.unshift({
					label: 'Тип',
					value: 'all'
				});

				return types;
			}
		},
		methods: {
			search() {

			}
		}
	};
</script>

<style scoped lang="scss">
	.search-bar {
		position: relative;
		display: flex;
		margin-left: -15px;
		margin-right: -15px;
		padding: 10px 25px;
		background-color: $blue;

		&:before, &:after {
			content: "";
			position: absolute;
			z-index: -1;
			width: 0px;
			height: 0px;
			bottom: -20px;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid darken($blue, 10%);
		}

		&:before{
			left: 0;
		}

		&:after {
			right: 0;
		}

		.form-input {
			flex: 1;
			margin: 0;
		}

		.form-input, .form-dropdown {
			margin-right: 12px;
		}
	}
</style>
