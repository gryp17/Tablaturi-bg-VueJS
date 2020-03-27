<template>
	<div class="resend-activation-page">
		<PageTitle>
			Изпрати линк за активация
		</PageTitle>

		<StatusMessage v-if="done">
			<img src="/img/icons/success-icon.png" />
			<h5>Линкът беше изпратен успешно.</h5>
			До няколко минути ще получите имейл на посочената поща.
		</StatusMessage>
		<div v-else class="form-wrapper">
			<FormInput
				v-model="email"
				:error="errors.email"
				@keyup.enter="submit"
				@focus="clearError"
				@blur="clearError"
				@keyup="clearError"
				type="text"
				name="email"
				floating-label
				placeholder="Email"
			></FormInput>

			<FormButton @click="submit" :disabled="submitting">
				Изпрати
			</FormButton>
		</div>

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'resendActivation';

	export default {
		data() {
			return {
				email: '',
				done: false,
				submitting: false
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
			...mapActions('auth', [
				'resendActivation'
			]),
			/**
			 * Submits the user activation form
			 */
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				this.resendActivation(this.email).then((res) => {
					const data = res.data;

					if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					} else if (data.success) {
						this.done = true;
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

<style lang="scss">
	.resend-activation-page {
		.form-wrapper {
			width: 60%;
			margin: 20px auto;

			.form-button {
				display: block;
				margin: auto;
			}
		}
	}
</style>
