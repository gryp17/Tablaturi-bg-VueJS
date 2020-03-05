<template>
	<div class="add-article">
		<PageTitle>
			Добави новина
		</PageTitle>

		<div class="picture-wrapper">
			<FormFileInput
				:error="errors.picture"
				@click="clearError"
				@change="pictureChanged"
				ref="picture"
				name="picture"
			>
				<UploadImagePreview :image="picturePreview" />
			</FormFileInput>

			<div class="picture-hint">
				Позволени формати: JPG и PNG под 1MB
			</div>
		</div>

		<FormInput
			v-model="title"
			:error="errors.title"
			@keyup.enter="submit"
			@focus="clearError"
			type="text"
			name="title"
			floating-label
			placeholder="Заглавие"
		></FormInput>

		<FormDatepicker
			v-model="date"
			:error="errors.date"
			@focus="clearError"
			name="date"
			floating-label
			placeholder="Дата на публикуване"
		/>

		<FormInput
			v-model="content"
			:error="errors.content"
			:rows="10"
			@keyup.enter="submit"
			@focus="clearError"
			tag="textarea"
			name="content"
			floating-label
			placeholder="Съдържание"
		></FormInput>

		<FormButton @click="submit">
			Публикувай новината
		</FormButton>

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import UploadImagePreview from '@/components/UploadImagePreview';

	const formName = 'addArticle';

	export default {
		components: {
			UploadImagePreview
		},
		data() {
			return {
				title: '',
				date: null,
				content: '',
				picture: null,
				picturePreview: '/img/no-image.jpg'
			};
		},
		computed: {
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Updates the picture and picture preview values whenever the selected file changes
			 * @param {Object} e
			 */
			pictureChanged(e) {
				this.picture = e.target.files[0];
				this.picturePreview = URL.createObjectURL(e.target.files[0]);
			},
			/**
			 * Submits the article form
			 */
			submit() {

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
	.add-article {
		.picture-wrapper {
			margin: auto;
			width: 200px;

			.picture-hint {
				margin-top: 5px;
				margin-bottom: 10px;
				font-size: 10px;
				font-style: italic;
			}
		}

		.form-datepicker {
			width: 200px;
		}

		.form-button {
			display: block;
			margin: 20px auto 10px auto;
		}
	}
</style>
