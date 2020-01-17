<template>
	<div class="user-login-modal">

		<BaseModal :visible="visible" @hidden="hideLoginModal">
			<template v-slot:header>
				<h5 class="modal-title">
					{{ modalTitle }}
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<ForgottenPasswordForm v-if="forgottenPasswordFormVisible" />
				<template v-else>
					<FormInput
						v-model="username"
						:error="errors.username"
						@keyup.enter="loginUser()"
						@focus="clearError"
						type="text"
						name="username"
						placeholder="Потребителско име"
					></FormInput>

					<FormInput
						v-model="password"
						:error="errors.password"
						@keyup.enter="loginUser()"
						@focus="clearError"
						type="password"
						name="password"
						placeholder="Парола"
					></FormInput>

					<div class="form-group row">
						<div class="col-6">
							<input v-model="rememberMe" type="checkbox" id="remember-me-checkbox"/>
							<label for="remember-me-checkbox">
								Запомни ме
							</label>
						</div>
						<div class="col-6">
							<a @click.prevent="showForgottenPasswordForm" href="#" class="forgotten-password-link">
								Забравена парола?
							</a>
						</div>
					</div>

					<FormButton @click="loginUser()" class="login-btn">
						Влез
					</FormButton>
				</template>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal.vue';
	import ForgottenPasswordForm from '@/components/modals/login/ForgottenPasswordForm';

	const formName = 'login';

	export default {
		components: {
			BaseModal,
			ForgottenPasswordForm
		},
		data() {
			return {
				username: '',
				password: '',
				rememberMe: false,
				forgottenPasswordFormVisible: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'loginModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			modalTitle() {
				return this.forgottenPasswordFormVisible ? 'Забравена парола' : 'Вход';
			}
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible() {
				this.resetState();
				this.resetFormErrors(formName);
			}
		},
		methods: {
			...mapActions('modals', [
				'hideLoginModal'
			]),
			/*
			...mapActions('user', [
				'login'
			]),
			*/
			...mapActions('forms', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Shows the forgotten password form
			 */
			showForgottenPasswordForm() {
				this.forgottenPasswordFormVisible = true;
			},
			/**
			 * Tries to authenticate the user with the provided credentials
			 */
			loginUser() {
				/*
				this.login({
					username: this.username,
					password: this.password,
					rememberMe: this.rememberMe
				}).then((data) => {
					if (data.user) {
						this.hideLoginModal();
					} else if (data.errors) {
						this.setFormErrors({
							form: formName,
							errors: data.errors
						});
					}
				});
				*/
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
	.user-login-modal {
		$max-width: 470px;

		.modal-dialog {
			margin-top: 20vh;
			max-width: $max-width;
			text-align: left;

			.modal-body{
				.forgotten-password-link {
					float: right;
					color: $text-color;
					text-decoration: underline;
					font-size: 13px;
				}

				.login-btn {
					display: block;
					margin: auto;
				}
			}
		}
	}
</style>
