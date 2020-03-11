<template>
	<div class="tab-form">
		<PageTitle>
			{{ formTitle }}
		</PageTitle>

		<div class="row">
			<div class="col-6">
				<FormDropdown
					v-model="type"
					:options="tabTypes"
					label="Вид таблатура:"
				/>

				<FormInput
					v-model="band"
					:error="errors.band"
					@keyup.enter="submit"
					@focus="clearError"
					type="text"
					name="band"
					floating-label
					placeholder="Група"
				></FormInput>

				<FormInput
					v-model="song"
					:error="errors.song"
					@keyup.enter="submit"
					@focus="clearError"
					type="text"
					name="song"
					floating-label
					placeholder="Песен"
				></FormInput>

				<FormDropdown
					v-model="tunning"
					:options="tunningOptions"
					label="Тунинг:"
				/>

				<FormInput
					v-show="showCustomTunning"
					v-model="customTunning"
					:error="errors.tunning"
					@keyup.enter="submit"
					@focus="clearError"
					type="text"
					name="tunning"
					floating-label
					placeholder="Друг тунинг"
				></FormInput>
			</div>
			<div class="col-6">
				<FormRadioGroup
					v-model="tabType"
					:items="secondaryTabTypes"
					title="Тип таблатура:"
				/>

				<FormDropdown
					v-model="difficulty"
					:options="difficultyOptions"
					class="difficulty-dropdown"
					label="Трудност:"
				/>
			</div>
		</div>

		<div v-if="showFileUpload" class="file-upload-wrapper">
			<FormFileInput
				:error="errors.gp_file"
				@click="clearError"
				@change="fileChanged"
				label="Guitar Pro файл:"
				name="gp_file"
			/>

			<div v-show="uploadedFile" class="uploaded-file-preview">
				<img src="/img/gp-file.png" />
				{{ uploadedFile }}
			</div>

			<div class="file-hint">
				Позволени формати: gp, gp3, gp4, gp5, gp6 и gpx под 1MB
			</div>
		</div>
		<FormInput
			v-else
			v-model="content"
			monospaced
			:error="errors.content"
			:rows="10"
			@focus="clearError"
			tag="textarea"
			name="content"
			floating-label
			placeholder="Текстова таблатура"
		></FormInput>

		<FormButton @click="submit" class="submit-btn">
			{{ buttonText }}
		</FormButton>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'tab';

	export default {
		props: {
			tab: Object
		},
		data() {
			return {
				tabId: null,
				type: 'tab',
				tabType: 'full song',
				band: '',
				song: '',
				difficulty: 'Средна',
				tunning: 'Стандартен (EBGDAE)',
				customTunning: '',
				content: '',
				gpFile: null,
				difficultyOptions: {
					Ниска: 'Ниска',
					Средна: 'Средна',
					Висока: 'Висока'
				},
				tunningOptions: {
					'Стандартен (EBGDAE)': 'Стандартен (EBGDAE)',
					'Drop D': 'Drop D',
					'Drop C': 'Drop C',
					other: 'Друг'
				}
			};
		},
		computed: {
			...mapState([
				'TAB_TYPES',
				'SECONDARY_TAB_TYPES'
			]),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			isEditing() {
				return this.tab && this.tab.ID;
			},
			formTitle() {
				return this.isEditing ? 'Редактирай таблатура' : 'Качи таблатура';
			},
			buttonText() {
				return this.isEditing ? 'Запази промените' : 'Публикувай таблатурата';
			},
			showCustomTunning() {
				return this.tunning === 'other';
			},
			showFileUpload() {
				return this.type === 'gp';
			},
			uploadedFile() {
				return this.gpFile && this.gpFile.name ? this.gpFile.name : null;
			},
			tabTypes() {
				const options = {};
				this.TAB_TYPES.forEach((value) => {
					options[value] = this.$options.filters.labelsMap(value);
				});

				return options;
			},
			secondaryTabTypes() {
				const options = {};
				this.SECONDARY_TAB_TYPES.forEach((value) => {
					options[value] = this.$options.filters.labelsMap(value);
				});

				return options;
			}
		},
		created() {
			if (this.isEditing) {
				this.tabId = this.tab.ID;
				this.type = this.tab.type;
				this.tabType = this.tab.tab_type;
				this.band = this.tab.band;
				this.song = this.tab.song;
				this.difficulty = this.tab.difficulty;
				this.content = this.tab.content;

				//tunning specific checks
				const defaultTunnings = { ...this.tunningOptions };
				delete defaultTunnings.other;

				if (defaultTunnings[this.tab.tunning]) {
					this.tunning = this.tab.tunning;
				} else {
					this.tunning = 'other';
					this.customTunning = this.tab.tunning;
				}
			}
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('tabs', [
				'addTab',
				'updateTab'
			]),
			/**
			 * Updates the file whenever the selected file changes
			 * @param {Object} e
			 */
			fileChanged(e) {
				this.gpFile = e.target.files[0];
			},
			/**
			 * Submits the tab form
			 */
			submit() {
				const action = this.isEditing ? this.updateTab : this.addTab;
				const formData = new FormData();

				['tabId', 'type', 'tabType', 'band', 'song', 'difficulty', 'content', 'gpFile'].forEach((field) => {
					if (this[field]) {
						const snakeCaseField = this.$options.filters.camelToSnake(field);
						const value = this[field];
						formData.append(snakeCaseField, value);
					}
				});

				//tunning
				const tunning = this.showCustomTunning ? this.customTunning : this.tunning;
				formData.append('tunning', tunning);

				action(formData).then((res) => {
					const data = res.data;

					if (data.success) {
						this.$router.push({
							name: 'tab',
							params: {
								id: data.tab_id
							}
						});
					} else if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					}
				});
			},
			/**
			 * Clears the form errors related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: formName,
					field
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.tab-form {
		.difficulty-dropdown {
			margin-top: 26px;
		}

		.file-upload-wrapper {
			.form-file-input {
				display: inline-block;
			}

			.uploaded-file-preview {
				font-weight: 600;

				img {
					width: 40px;
					margin-right: 5px;
				}
			}

			.file-hint {
				margin-top: 5px;
				margin-bottom: 10px;
				font-size: 10px;
				font-style: italic;
			}
		}

		.submit-btn {
			display: block;
			margin: 20px auto 10px auto;
		}
	}
</style>
