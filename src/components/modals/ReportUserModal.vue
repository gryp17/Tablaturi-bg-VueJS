<template>
	<div class="report-user-modal">

		<BaseModal :visible="visible" @hidden="hideReportUserModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Докладване на потребител {{ user.username }}
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<template v-if="!done">
					<FormRadioGroup
						v-model="reason"
						:items="reportReasons"
						title="Причина:"
					/>

					<FormInput
						v-model="other"
						:disabled="reason !== 'other'"
						:error="errors.report"
						@focus="clearError"
						tag="textarea"
						name="report"
						floating-label
						placeholder="Друга причина"
					></FormInput>

					<FormButton @click="submit" :disabled="submitting" class="submit-btn">
						Докладвай
					</FormButton>
				</template>
				<StatusMessage v-else>
					<img src="/img/icons/success-icon.png" />
					<h5>Успешно докладвахте {{ user.username }}!.</h5>
					Екипът ни ще разгледа докладвания профил в най-скоро време.
				</StatusMessage>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'reportUser';

	export default {
		components: {
			BaseModal
		},
		props: {
			user: Object
		},
		data() {
			return {
				reportReasons: {
					rude_language: 'Грубо отношение или език',
					spam: 'Спам',
					inappropriate_avatar: 'Неподходящ аватар',
					other: 'Друго'
				},
				reason: 'rude_language',
				other: '',
				done: false,
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'reportUserModalOpened'
			}),
			...mapState('forms', {
				errors: state => state.errors[formName]
			}),
			reportReason() {
				return this.reason !== 'other' ? this.reason : this.other;
			}
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
			}
		},
		methods: {
			...mapActions('modals', [
				'hideReportUserModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('user', [
				'reportUser'
			]),
			/**
			 * Submits the report user form
			 */
			submit() {
				if (this.submitting) {
					return;
				}

				const params = {
					userId: this.user.ID,
					report: this.reportReason
				};

				this.submitting = true;

				this.reportUser(params).then((res) => {
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
	.report-user-modal {
		$max-width: 500px;

		.modal-dialog {
			margin-top: 10vh;
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
