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
						@keyup.enter="submit"
						@focus="clearError"
						type="text"
						name="username"
						placeholder="Потребителско име"
					></FormInput>

					<FormInput
						v-model="email"
						:error="errors.email"
						@keyup.enter="submit"
						@focus="clearError"
						type="text"
						name="email"
						placeholder="Email"
					></FormInput>

					<FormInput
						v-model="password"
						:error="errors.password"
						@keyup.enter="submit"
						@focus="clearError"
						type="password"
						name="password"
						placeholder="Парола"
					></FormInput>

					<FormInput
						v-model="repeatPassword"
						:error="errors.repeat_password"
						@keyup.enter="submit"
						@focus="clearError"
						type="password"
						name="repeat_password"
						placeholder="Повтори паролата"
					></FormInput>

					<FormDatepicker
						v-model="birthday"
						:error="errors.birthday"
						@focus="clearError"
						name="birthday"
						placeholder="Рождена дата"
					/>

					<div class="gender-wrapper form-group">
						<label>
							Пол:
						</label>

						<input type="radio" id="male" value="M" v-model="gender"/>
						<label for="male">
							Мъж
						</label>

						<input type="radio" id="female" value="F" v-model="gender"/>
						<label for="female">
							Жена
						</label>
					</div>

					<FormCaptcha
						v-model="captcha"
						:error="errors.captcha"
						@keyup.enter="submit"
						@focus="clearError"
						ref="captcha"
					/>

					<FormButton @click="submit" class="signup-btn">
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
	import moment from 'moment';
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'signup';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				username: '',
				email: '',
				password: '',
				repeatPassword: '',
				birthday: null,
				gender: 'M',
				captcha: '',
				done: false
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
					birthday: moment(this.birthday).format('YYYY-MM-DD'),
					gender: this.gender,
					captcha: this.captcha
				};

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
			margin-top: 20vh;
			max-width: $max-width;
			text-align: left;

			.modal-body{

				//TODO: move this to a component
				.gender-wrapper {
					label {
						margin-right: 10px;
						margin-bottom: 0px;
					}
				}

				.signup-btn {
					display: block;
					margin: auto;
					margin-top: 10px;
				}
			}
		}
	}
</style>
