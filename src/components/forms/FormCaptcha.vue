<template>
	<div class="form-captcha">
		<img :src="captchaImageUrl" class="captcha-image" />

		<button @click="resetCaptcha" class="reset-captcha-button">
			<img src="/img/icons/reload-icon.png" />
		</button>

		<FormInput
			v-bind="$props"
			v-on="{
				...$listeners
			}"
			type="text"
			name="captcha"
			placeholder="Captcha"
		></FormInput>
	</div>
</template>

<script>
	import config from '@/config';

	export default {
		props: {
			value: String,
			error: String
		},
		data() {
			return {
				timestamp: new Date().getTime()
			};
		},
		computed: {
			captchaImageUrl() {
				return `${config.API_URL}/Misc/generateCaptcha?timestamp=${this.timestamp}`;
			}
		},
		methods: {
			resetCaptcha() {
				this.timestamp = new Date().getTime();
			}
		}
	};
</script>

<style lang="scss">
	.form-captcha {
		display: flex;

		.captcha-image {
			max-height: 40px;
		}

		.reset-captcha-button {
			margin: 0px 10px;
			height: 40px;
			padding: 5px;
			border: none;
			background-color: transparent;

			img {
				width: 30px;
			}
		}

		.form-input {
			flex: 1;

			.form-control {
				max-width: 80px;
			}
		}
	}
</style>
