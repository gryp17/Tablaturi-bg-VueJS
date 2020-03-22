<template>
	<div class="forgotten-password-form">
		<template v-if="!done">
			<FormInput
				v-model="email"
				:error="errors.email"
				@keyup.enter="submit()"
				@focus="clearError"
				@blur="clearError"
				@keyup="clearError"
				type="text"
				name="email"
				floating-label
				placeholder="Email"
			></FormInput>

			<FormButton @click="submit()" :disabled="submitting">
				Изпрати
			</FormButton>
		</template>

		<StatusMessage v-else>
			<img src="/img/icons/success-icon.png" />
			<h5>Заявката за смяна на парола беше изпратена успешно.</h5>
			До няколко минути ще получите имейл с линк, от който да смените паролата си.
		</StatusMessage>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'forgottenPassword';

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
			...mapActions('auth', [
				'sendPasswordResetRequest'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Sends the password reset request
			 */
			submit() {
				this.submitting = true;
				this.sendPasswordResetRequest(this.email).then((res) => {
					const data = res.data;

					if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					} else {
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

<style scoped lang="scss">
	.forgotten-password-form {
		button {
			display: block;
			margin: auto;
		}
	}
</style>
