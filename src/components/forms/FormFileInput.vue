<template>
	<div class="form-file-input form-group">
		<label v-if="label">
			{{ label }}
		</label>

		<div @click="openFileBrowser()">
			<slot>
				<FormButton class="browse-btn">
					<i class="fas fa-file-upload"></i>
					Избери файл
				</FormButton>
			</slot>
		</div>

		<input
			:class="className"
			:name="name"
			v-on="$listeners"
			ref="file"
			type="file"
		/>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import $ from 'jquery';
	import FormInputError from '@/components/forms/FormInputError';

	export default {
		components: {
			FormInputError
		},
		props: {
			label: String,
			className: String,
			name: String,
			error: String
		},
		methods: {
			/**
			 * Opens the file input
			 */
			openFileBrowser() {
				$(this.$refs.file).click();
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-file-input {
		position: relative;

		.browse-btn{
			display: block;
			width: 100%;

			.fa-file-upload {
				margin-right: 5px;
				margin-top: -3px;
			}
		}

		input {
			display: none;
		}
	}
</style>
