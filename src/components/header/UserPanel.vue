<template>
	<div class="user-panel">

		<template v-if="userSession">
			{{ welcomeMessage }}
			<router-link
				:to="{name: 'profile', params: {id: userSession.ID}}"
				class="profile-link red"
			>{{ userSession.username }}</router-link>

			<FormButton @click="onLogout">
				Изход
			</FormButton>
		</template>
		<template v-else>
			<a @click.prevent="showSignupModal" class="signup-link" href="#">
				Регистрация
			</a>
			<FormButton @click="showLoginModal">
				Вход
			</FormButton>
		</template>

		<UserLoginModal/>
		<UserSignupModal/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import UserLoginModal from '@/components/modals/login/UserLoginModal';
	import UserSignupModal from '@/components/modals/UserSignupModal';

	export default {
		components: {
			UserLoginModal,
			UserSignupModal
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			welcomeMessage() {
				if (!this.userSession) {
					return;
				}

				return this.userSession.gender === 'M' ? 'Добре дошъл' : 'Добре дошла';
			}
		},
		methods: {
			...mapActions('modals', [
				'showLoginModal',
				'showSignupModal'
			]),
			...mapActions('auth', [
				'logout'
			]),
			/**
			 * Logs out the user and redirects to the home page
			 */
			onLogout() {
				this.logout().then(() => {
					this.$router.push({ name: 'home' });
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-panel {
		padding: 10px;
		text-align: right;

		.profile-link {
			margin-right: 10px;
		}

		.signup-link {
			margin-right: 10px;
			text-decoration: underline;
			font-size: 16px;
			color: $text-color;
		}
	}
</style>
