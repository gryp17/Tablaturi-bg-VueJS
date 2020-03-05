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

				<FormButton @click="submit" class="submit-btn">
					Докладвай
				</FormButton>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	export default {
		components: {
			BaseModal
		},
		props: {
			user: Object
		},
		data() {
			return {
				reason: 'rude language'
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'reportUserModalOpened'
			})
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
			...mapActions('user', [
				'getUser',
				'updateUser'
			]),
			/**
			 * Submits the report user form
			 */
			submit() {

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
