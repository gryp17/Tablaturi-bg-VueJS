<template>
	<div class="search-bar">

		<FormAutocompleteInput
			v-model="band"
			@keyup.enter="submit"
			type="text"
			name="band"
			placeholder="Група"
			field="band"
		/>

		<FormAutocompleteInput
			v-model="song"
			:band="band"
			@keyup.enter="submit"
			type="text"
			name="song"
			placeholder="Песен"
			field="song"
		/>

		<FormDropdown
			v-model="type"
			:options="tabTypes"
			name="type"
		/>

		<FormButton @click="submit">
			Търси
		</FormButton>

	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
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
				const options = {
					all: 'Тип'
				};

				this.TAB_TYPES.forEach((value) => {
					options[value] = this.$options.filters.labelsMap(value);
				});

				return options;
			}
		},
		created() {
			this.parseUrlParams();
		},
		methods: {
			/**
			 * Submits the search params
			 */
			submit() {
				if (!this.band && !this.song) {
					return;
				}

				this.$router.push({
					name: 'search',
					params: {
						type: this.type,
						band: this.band || '*',
						song: this.song || '*'
					}
				}).catch(() => {});
			},
			/**
			 * Parses the URL for the search params
			 */
			parseUrlParams() {
				this.type = this.$route.params.type;
				this.band = this.$route.params.band !== '*' ? this.$route.params.band : '';
				this.song = this.$route.params.song !== '*' ? this.$route.params.song : '';
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
			margin-bottom: 0;
		}
	}
</style>
