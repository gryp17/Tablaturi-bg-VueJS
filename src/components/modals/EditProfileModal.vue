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

				<template v-if="!done">

					inputs

					<FormButton @click="submit" class="submit-btn">
						ОК
					</FormButton>
				</template>
				<StatusMessage v-else>
					success
				</StatusMessage>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'editProfile';

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
				done: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'editProfileModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
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

				.submit-btn {
					display: block;
					margin: auto;
					margin-top: 10px;
				}
			}
		}
	}
</style>
