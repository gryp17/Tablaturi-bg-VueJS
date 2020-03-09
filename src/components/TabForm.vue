<template>
	<div class="tab-form">
		<PageTitle>
			{{ formTitle }}
		</PageTitle>

		<div class="row">
			<div class="col-6">
				left col
			</div>
			<div class="col-6">
				right col
			</div>
		</div>

		<FormButton @click="submit">
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
			return {};
		},
		computed: {
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
			}
		},
		created() {
			if (this.isEditing) {
				/*
				this.id = this.article.ID;
				this.title = this.article.title;
				this.date = new Date(this.article.date);
				this.content = this.article.content;
				this.imagePreview = this.imageUrl;
				*/
			}
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Submits the tab form
			 */
			submit() {
				//const action = this.isEditing ? this.updateArticle : this.addArticle;
				//const formData = new FormData();
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
		.form-button {
			display: block;
			margin: 20px auto 10px auto;
		}
	}
</style>
