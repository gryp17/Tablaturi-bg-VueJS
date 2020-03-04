<template>
	<div class="add-article">
		add article
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'addArticle';

	export default {
		data() {
			return {};
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

</style>
