<template>
	<div class="add-comment-box">
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
	</div>
</template>

<script>
	import EmoticonsList from '@/components/EmoticonsList';

	export default {
		components: {
			EmoticonsList
		},
		props: {
			error: String
		},
		data() {
			return {
				content: ''
			};
		},
		methods: {
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
	}
</style>
