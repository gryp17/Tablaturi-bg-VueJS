<template>
	<div class="forgotten-password-form">
		<FormInput
			v-model="email"
			:error="errors.email"
			@keyup.enter="submit()"
			@focus="clearError"
			type="text"
			name="email"
			placeholder="Email"
		></FormInput>

		<FormButton @click="submit()">
			Изпрати
		</FormButton>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'forgottenPassword';

	export default {
		data() {
			return {
				email: ''
			};
		},
		computed: {
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
		},
		methods: {
			...mapActions('forms', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
			submit() {
				//TODO: implement this!!!!
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
			},
		}
	};
</script>

<style scoped lang="scss">
	.forgotten-password-form {
		button {
			display: block;
			margin: auto;
		}
	}
</style>
