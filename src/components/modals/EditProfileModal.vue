<template>
	<div class="edit-profile-modal">

		<BaseModal :visible="visible" @hidden="hideEditProfileModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Редакция на профил
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<div class="columns-wrapper">
					<div class="avatar-wrapper">
						<FormFileInput
							:error="errors.avatar"
							@click="clearError"
							@change="avatarChanged"
							ref="avatar"
							name="avatar"
						>
							<UploadImagePreview :image="avatarPreview"/>
						</FormFileInput>

						<div class="avatar-hint">
							Позволени формати: JPG и PNG под 1MB
						</div>
					</div>

					<div class="right-wrapper">
						<FormInput
							v-model="password"
							:error="errors.password"
							@focus="clearError"
							type="password"
							name="password"
							floating-label
							placeholder="Нова парола"
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

						<FormInput
							v-model="location"
							:error="errors.location"
							@focus="clearError"
							type="text"
							name="location"
							floating-label
							placeholder="Местоживеене"
						></FormInput>

						<FormInput
							v-model="occupation"
							:error="errors.occupation"
							@focus="clearError"
							type="text"
							name="occupation"
							floating-label
							placeholder="Професия"
						></FormInput>

						<FormInput
							v-model="web"
							:error="errors.web"
							@focus="clearError"
							type="text"
							name="web"
							floating-label
							placeholder="Web"
						></FormInput>
					</div>
				</div>

				<FormInput
					v-model="aboutMe"
					:error="errors.about_me"
					@focus="clearError"
					tag="textarea"
					name="about_me"
					floating-label
					placeholder="За мен"
				></FormInput>

				<FormInput
					v-model="instrument"
					:error="errors.instrument"
					@focus="clearError"
					tag="textarea"
					name="instrument"
					floating-label
					placeholder="Инструменти/Екипировка"
				></FormInput>

				<FormInput
					v-model="favouriteBands"
					:error="errors.favourite_bands"
					@focus="clearError"
					tag="textarea"
					name="favourite_bands"
					floating-label
					placeholder="Любими групи/музиканти"
				></FormInput>

				<FormButton @click="submit" :disabled="submitting" class="submit-btn">
					Запази промените
				</FormButton>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';
	import UploadImagePreview from '@/components/UploadImagePreview';

	const formName = 'editProfile';

	export default {
		components: {
			BaseModal,
			UploadImagePreview
		},
		props: {
			user: Object
		},
		data() {
			return {
				password: '',
				repeatPassword: '',
				location: '',
				occupation: '',
				web: '',
				aboutMe: '',
				instrument: '',
				favouriteBands: '',
				avatar: null,
				avatarPreview: null,
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'editProfileModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			...mapState([
				'CDN_URL'
			])
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
				this.resetFormErrors(formName);
			}
		},
		methods: {
			...mapActions('modals', [
				'hideEditProfileModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('user', [
				'getUser',
				'updateUser'
			]),
			...mapActions('auth', [
				'getUserSession'
			]),
			/**
			 * Updates the avatar and avatar preview values whenever the selected file changes
			 * @param {Object} e
			 */
			avatarChanged(e) {
				this.avatar = e.target.files[0];
				this.avatarPreview = URL.createObjectURL(e.target.files[0]);
			},
			/**
			 * Submits the updated user data
			 */
			submit() {
				const formData = new FormData();

				['password', 'repeatPassword', 'location', 'occupation', 'web', 'aboutMe', 'instrument', 'favouriteBands', 'avatar'].forEach((field) => {
					if (this[field]) {
						const snakeCaseField = this.$options.filters.camelToSnake(field);
						formData.append(snakeCaseField, this[field]);
					}
				});

				this.submitting = true;

				this.updateUser(formData).then((res) => {
					const data = res.data;

					//reload the user and userSession data and close the modal
					if (data.success) {
						this.getUser(this.user.ID);
						this.getUserSession();
						this.hideEditProfileModal();
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

				this.location = this.user.location;
				this.occupation = this.user.occupation;
				this.web = this.user.web;
				this.aboutMe = this.user.about_me;
				this.instrument = this.user.instrument;
				this.favouriteBands = this.user.favourite_bands;
				this.avatarPreview = `${this.CDN_URL}/avatars/${this.user.photo}`;
			}
		}
	};
</script>

<style lang="scss">
	.edit-profile-modal {
		$max-width: 600px;

		.modal-dialog {
			margin-top: 5vh;
			max-width: $max-width;
			text-align: left;

			.modal-body{

				.columns-wrapper {
					display: flex;

					.avatar-wrapper {
						display: flex;
						flex-direction: column;
						justify-content: center;

						.avatar-hint {
							margin-top: 5px;
							margin-bottom: 10px;
							font-size: 10px;
							font-style: italic;
						}
					}

					.right-wrapper {
						flex: 1;
						padding-left: 20px;
					}
				}

				.submit-btn {
					display: block;
					margin: auto;
					margin-top: 10px;
				}
			}
		}
	}
</style>
