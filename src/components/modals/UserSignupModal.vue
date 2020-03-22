<template>
	<div class="user-signup-modal">

		<BaseModal :visible="visible" @hidden="hideSignupModal">
			<template v-slot:header>
				<h5 class="modal-title">
					{{ modalTitle }}
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<template v-if="!done">
					<FormInput
						v-model="username"
						:error="errors.username"
						@focus="clearError"
						type="text"
						name="username"
						floating-label
						placeholder="Потребителско име"
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
						v-model="password"
						:error="errors.password"
						@focus="clearError"
						type="password"
						name="password"
						floating-label
						placeholder="Парола"
					></FormInput>

					<FormInput
						v-model="repeatPassword"
						:error="errors.repeat_password"
						@focus="clearError"
						type="password"
						name="repeat_password"
						floating-label
						placeholder="Повтори паролата"
					></FormInput>

					<FormDatepicker
						v-model="birthday"
						:error="errors.birthday"
						@focus="clearError"
						name="birthday"
						floating-label
						placeholder="Рождена дата"
					/>

					<FormRadioGroup
						horizontal
						v-model="gender"
						:items="genders"
						title="Пол:"
					/>

					<FormCaptcha
						v-model="captcha"
						:error="errors.captcha"
						@focus="clearError"
						ref="captcha"
					/>

					<FormButton @click="submit" :disabled="submitting" class="signup-btn">
						Регистрирай се
					</FormButton>
				</template>
				<StatusMessage v-else>
					<img src="/img/icons/success-icon.png" />
					<h5>Благодарим Ви, че се регистрирахте.</h5>
					До няколко минути ще получите имейл с линк за активация на своя акаунт.
				</StatusMessage>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'signup';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				genders: {
					M: 'Мъж',
					F: 'Жена'
				},
				username: '',
				email: '',
				password: '',
				repeatPassword: '',
				birthday: null,
				gender: 'M',
				captcha: '',
				done: false,
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'signupModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			modalTitle() {
				return this.done ? 'Регистрирахте се успешно!' : 'Регистрация';
			}
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
				this.resetFormErrors(formName);

				if (value) {
					this.$refs.captcha.resetCaptcha();
				}
			}
		},
		methods: {
			...mapActions('modals', [
				'hideSignupModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('auth', [
				'signup'
			]),
			/**
			 * Submits the user signup data
			 */
			submit() {
				const params = {
					username: this.username,
					email: this.email,
					password: this.password,
					repeatPassword: this.repeatPassword,
					birthday: this.$options.filters.date(this.birthday, 'YYYY-MM-DD'),
					gender: this.gender,
					captcha: this.captcha
				};

				this.submitting = true;

				this.signup(params).then((res) => {
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
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.user-signup-modal {
		$max-width: 600px;

		.modal-dialog {
			margin-top: 10vh;
			max-width: $max-width;
			text-align: left;

			.modal-body{
				.signup-btn {
					display: block;
					margin: auto;
					margin-top: 10px;
				}
			}
		}
	}
</style>
