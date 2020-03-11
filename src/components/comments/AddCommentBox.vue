<template>
	<div class="add-comment-box">

		<template v-if="isLoggedIn">
			<h6>Напиши коментар:</h6>

			<div class="box-wrapper">
				<FormInput
					v-model="content"
					:error="errors.content"
					@keyup.enter="onSubmit"
					@focus="clearError"
					tag="textarea"
					name="content"
					floating-label
					placeholder="Коментар"
				/>

				<div class="right-wrapper">
					<EmoticonsList
						@emoticon-selected="onEmoticonSelected"
					/>

					<FormButton @click="onSubmit">
						Коментирай
					</FormButton>
				</div>
			</div>
		</template>

		<div v-else class="not-logged-in">
			<a @click.prevent="showSignupModal()" href="#" class="red">Регистрирай се</a>
			или
			<a @click.prevent="showLoginModal()" href="#" class="red">влез</a>, за да коментираш.
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import EmoticonsList from '@/components/EmoticonsList';

	const formName = 'addComment';

	export default {
		components: {
			EmoticonsList
		},
		props: {
			addComment: Function
		},
		data() {
			return {
				content: ''
			};
		},
		computed: {
			...mapGetters('auth', [
				'isLoggedIn'
			]),
			...mapState('forms', {
				errors: state => state.errors[formName]
			})
		},
		created() {
			this.resetFormErrors(formName);
		},
		methods: {
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('modals', [
				'showLoginModal',
				'showSignupModal'
			]),
			/**
			 * Triggered when an emoticon is clicked
			 * @param {String} emoticon
			 */
			onEmoticonSelected(emoticon) {
				const space = ' ';
				this.content = this.content + space + emoticon;
			},
			/**
			 * Submits the comment data
			 */
			onSubmit() {
				this.addComment(this.content).then((res) => {
					const data = res.data;

					if (data.success) {
						this.reset();
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
			 * Resets the comment content
			 */
			reset() {
				this.content = '';
			}
		}
	};
</script>

<style lang="scss">
	.add-comment-box {
		.box-wrapper {
			display: flex;
			padding-bottom: 15px;

			.form-input {
				margin: 0 10px 0 0;
				width: 100%;

				textarea {
					height: 110px;
				}
			}

			.right-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				max-width: 160px;

				.form-button {
					float: right;
				}
			}
		}

		.not-logged-in {
			padding: 10px;
			text-align: center;
		}
	}
</style>