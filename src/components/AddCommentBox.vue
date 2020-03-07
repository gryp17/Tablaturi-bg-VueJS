<template>
	<div class="add-comment-box">

		<template v-if="loggedIn">
			<h6>Напиши коментар:</h6>

			<div class="box-wrapper">
				<FormInput
					v-model="content"
					:error="error"
					@keyup.enter="onSubmit"
					@focus="$listeners.focus"
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
	import { mapActions } from 'vuex';
	import EmoticonsList from '@/components/EmoticonsList';

	export default {
		components: {
			EmoticonsList
		},
		props: {
			loggedIn: Boolean,
			error: String
		},
		data() {
			return {
				content: ''
			};
		},
		methods: {
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
			 * Sends the submit event
			 */
			onSubmit() {
				this.$emit('submit', this.content);
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
