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
						<FormFileInput>
							<UploadImagePreview :image="`${CDN_URL}/avatars/${user.photo}`"/>
						</FormFileInput>

						<div class="avatar-hint">
							Позволени формати: JPG и PNG под 1MB
						</div>
					</div>

					<div class="right-wrapper">
						inputs
					</div>
				</div>

				<FormButton @click="submit" class="submit-btn">
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
				username: '',
				email: '',
				password: '',
				repeatPassword: '',
				done: false
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
			/**
			 * Submits the updated user data
			 */
			submit() {

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
	.edit-profile-modal {
		$max-width: 600px;

		.modal-dialog {
			margin-top: 20vh;
			max-width: $max-width;
			text-align: left;

			.modal-body{

				.columns-wrapper {
					display: flex;

					.avatar-wrapper {
						.avatar-hint {
							margin-top: 5px;
							margin-bottom: 10px;
							font-size: 10px;
							font-style: italic;
						}
					}

					.right-wrapper {
						flex: 1;
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
