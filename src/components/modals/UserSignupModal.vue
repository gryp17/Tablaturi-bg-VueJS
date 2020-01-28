<template>
	<div class="user-signup-modal">

		<BaseModal :visible="visible" @hidden="hideSignupModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Регистрация
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<FormButton class="signup-btn">
					Регистрирай се
				</FormButton>

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
				username: ''
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'signupModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
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
				'hideSignupModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
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

				.signup-btn {
					display: block;
					margin: auto;
				}
			}
		}
	}
</style>
