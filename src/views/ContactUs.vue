<template>
	<div class="contact-us-page">
		<StatusMessage v-if="done">
			<img src="/img/icons/success-icon.png" />
			<h5>Съобщението беше изпратено успешно.</h5>
			Ще се свържем с Вас на посочения имейл възможно най-скоро.
		</StatusMessage>
		<template v-else>
			<PageTitle>
				Свържете се с нас
			</PageTitle>

			<p class="intro">
				За всякакви препоръки, похвали, оплаквания или въпроси можете да се свържете с нас чрез формуляра.
			</p>

			<div class="form-wrapper">
				<FormInput
					v-model="username"
					:error="errors.username"
					@focus="clearError"
					type="text"
					name="username"
					floating-label
					placeholder="Име"
				></FormInput>

				<FormInput
					v-model="email"
					:error="errors.email"
					@focus="clearError"
					type="text"
					name="email"
					floating-label
					placeholder="Email"
				></FormInput>

				<FormInput
					v-model="message"
					:error="errors.message"
					:rows="8"
					@focus="clearError"
					tag="textarea"
					name="message"
					floating-label
					placeholder="Съобщение"
				></FormInput>

				<FormCaptcha
					v-model="captcha"
					:error="errors.captcha"
					@focus="clearError"
				/>

				<FormButton @click="submit" :disabled="submitting" class="submit-btn">
					Изпрати
				</FormButton>
			</div>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'contactUs';

	export default {
		data() {
			return {
				username: '',
				email: '',
				message: '',
				captcha: '',
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
			...mapActions('misc', [
				'sendContactUsForm'
			]),
			/**
			 * Submits the contact us form
			 */
			submit() {
				const params = {
					username: this.username,
					email: this.email,
					message: this.message,
					captcha: this.captcha
				};

				this.submitting = true;

				this.sendContactUsForm(params).then((res) => {
					const data = res.data;

					if (data.success) {
						this.done = true;
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
			},
		}
	};
</script>

<style scoped lang="scss">
	.contact-us-page {

		.intro {
			margin-top: 40px;
		}

		.form-wrapper {
			margin: auto;
			width: 65%;

			.submit-btn {
				display: block;
				margin: 10px auto;
			}
		}
	}
</style>
