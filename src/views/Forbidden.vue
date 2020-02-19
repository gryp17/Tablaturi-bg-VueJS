<template>
	<div class="forbidden-page">
		<img src="/img/locked.png" />
		<h5>
			Страница с ограничен достъп
		</h5>
		<p>
			<a @click.prevent="showSignupModal()" href="#" class="red">Регистрирай се</a>
			или
			<a @click.prevent="showLoginModal()" href="#" class="red">влез</a>, за да достъпиш страницата.
		</p>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions('modals', [
				'showLoginModal',
				'showSignupModal'
			])
		}
	};
</script>

<style scoped lang="scss">
	.forbidden-page {
		text-align: center;

		img {
			width: 180px;
			margin: 15px auto;
		}
	}
</style>
