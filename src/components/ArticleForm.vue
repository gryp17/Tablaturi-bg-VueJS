<template>
	<div class="article-form">
		<PageTitle>
			{{ formTitle }}
		</PageTitle>

		<div class="image-wrapper">
			<FormFileInput
				:error="errors.image"
				@click="clearError"
				@change="imageChanged"
				name="image"
			>
				<UploadImagePreview :image="imagePreview" />
			</FormFileInput>

			<div class="image-hint">
				Позволени формати: JPG и PNG под 1MB
			</div>
		</div>

		<FormInput
			v-model="title"
			:error="errors.title"
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
			@focus="clearError"
			tag="textarea"
			name="content"
			floating-label
			placeholder="Съдържание"
		></FormInput>

		<FormButton @click="submit" :disabled="submitting">
			{{ buttonText }}
		</FormButton>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import UploadImagePreview from '@/components/UploadImagePreview';

	const formName = 'article';

	export default {
		components: {
			UploadImagePreview
		},
		props: {
			article: Object
		},
		data() {
			return {
				id: null,
				title: '',
				date: null,
				content: '',
				image: null,
				imagePreview: '/img/no-image.jpg',
				submitting: false
			};
		},
		computed: {
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			...mapState([
				'CDN_URL'
			]),
			isEditing() {
				return this.article && this.article.ID;
			},
			imageUrl() {
				return `${this.CDN_URL}/articles/${this.article.picture}`;
			},
			formTitle() {
				return this.isEditing ? 'Редактирай новина' : 'Добави новина';
			},
			buttonText() {
				return this.isEditing ? 'Запази промените' : 'Публикувай новината';
			}
		},
		created() {
			if (this.isEditing) {
				this.id = this.article.ID;
				this.title = this.article.title;
				this.date = new Date(this.article.date);
				this.content = this.article.content;
				this.imagePreview = this.imageUrl;
			}
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('articles', [
				'addArticle',
				'updateArticle'
			]),
			/**
			 * Updates the image and image preview values whenever the selected file changes
			 * @param {Object} e
			 */
			imageChanged(e) {
				this.image = e.target.files[0];
				this.imagePreview = URL.createObjectURL(e.target.files[0]);
			},
			/**
			 * Submits the article form
			 */
			submit() {
				const action = this.isEditing ? this.updateArticle : this.addArticle;
				const formData = new FormData();

				['id', 'title', 'date', 'content', 'image'].forEach((field) => {
					if (this[field]) {
						let value = this[field];

						if (field === 'date') {
							value = this.$options.filters.date(value, 'YYYY-MM-DD HH:mm:ss');
						}

						formData.append(field, value);
					}
				});

				this.submitting = true;

				action(formData).then((res) => {
					const data = res.data;

					if (data.success) {
						this.$router.push({
							name: 'article',
							params: {
								id: data.article_id
							}
						});
					} else if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					}

					this.submitting = false;
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
	.article-form {
		.image-wrapper {
			margin: auto;
			width: 200px;

			.image-hint {
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
