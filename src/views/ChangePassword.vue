<template>
	<div class="change-password-page">
		<LoadingIndicator v-if="!tokenChecked" />
		<template v-else>
			<StatusMessage v-if="done">
				<img src="/img/icons/success-icon.png" />
				<h5>Паролата беше сменена успешно.</h5>
				Вече можете да <a @click.prevent="showLoginModal()" href="#" class="red">влезете</a> в профила си.
			</StatusMessage>
			<template v-else>
				<div v-if="validToken" class="change-password-form">
					<h5 class="title">Смяна на паролата</h5>

					<FormInput
						v-model="password"
						:error="errors.password"
						@keyup.enter="changePassword()"
						@focus="clearError"
						type="password"
						name="password"
						placeholder="Нова парола"
					></FormInput>

					<FormInput
						v-model="repeatPassword"
						:error="errors.repeatPassword"
						@keyup.enter="changePassword()"
						@focus="clearError"
						type="password"
						name="repeatPassword"
						placeholder="Повтори паролата"
					></FormInput>

					<FormButton @click="changePassword()">
						Смени паролата
					</FormButton>
				</div>
				<StatusMessage v-else>
					<img src="/img/icons/sad.png" />
					<p>
						Линкът е невалиден или е изтекъл.
						<br/>
						При проблем със смяната на паролата се
						<router-link :to="{name: 'contact-us'}" class="red">свържете с нас</router-link>.
					</p>
				</StatusMessage>
			</template>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'changePassword';

	export default {
		data() {
			return {
				password: '',
				repeatPassword: '',
				tokenChecked: false,
				validToken: false,
				done: false
			};
		},
		computed: {
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
		},
		created() {
			const { userId, hash } = this.$route.params;
			console.log(userId);
			console.log(hash);

			setTimeout(() => {
				this.tokenChecked = true;
				this.validToken = true;
			}, 2000);
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('modals', [
				'showLoginModal'
			]),
			changePassword() {

				//TODO:
				//after the password has been changed set a login redirect to the home page (using 'setRedirectAfterLogin')

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
	.change-password-page {

		.change-password-form {
			text-align: center;

			.title {
				margin-bottom: 15px;
			}

			.form-input {
				margin-left: auto;
				margin-right: auto;
				width: 40%;
			}
		}
	}
</style>
