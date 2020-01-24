<template>
	<div class="user-panel">

		{{ userSession }}

		<template v-if="userSession">
			{{ userSession.username }}
			<FormButton @click="logout">
				Изход
			</FormButton>
		</template>
		<template v-else>
			<a class="signup-link" href="#">Регистрация</a>
			<FormButton @click="showLoginModal">
				Вход
			</FormButton>
		</template>

		<UserLoginModal/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import UserLoginModal from '@/components/modals/login/UserLoginModal';

	export default {
		components: {
			UserLoginModal
		},
		computed: {
			...mapState('auth', [
				'userSession'
			])
		},
		methods: {
			...mapActions('modals', [
				'showLoginModal'
			]),
			...mapActions('auth', [
				'logout'
			])
		}
	};
</script>

<style scoped lang="scss">
	.user-panel {
		padding: 10px;
		text-align: right;

		.signup-link {
			margin-right: 10px;
			text-decoration: underline;
			font-size: 16px;
			color: $text-color;
		}
	}
</style>
