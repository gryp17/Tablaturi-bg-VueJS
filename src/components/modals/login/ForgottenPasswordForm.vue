<template>
	<div class="forgotten-password-form">
		<template v-if="!done">
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
		</template>

		<div v-else class="success-message">
			<img src="/img/icons/success-icon.png" />
			<div class="message">
				<h5>Заявката за смяна на парола беше изпратена успешно.</h5>
				До няколко минути ще получите имейл с линк, от който да смените паролата си.
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'forgottenPassword';

	export default {
		data() {
			return {
				email: '',
				done: false
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

		.success-message {
			text-align: center;

			.message {
				margin-top: 15px;
			}
		}
	}
</style>
