<template>
	<div class="user-activation-page">
		<LoadingIndicator v-if="!tokenChecked" />
		<template v-else>
			<StatusMessage v-if="validToken">
				<img src="/img/icons/success-icon.png" />
				<h5>Успешно активирахте своя профил.</h5>
				Вече можете да <a @click.prevent="showLoginModal()" href="#" class="red">влезете</a> в профила си.
			</StatusMessage>
			<StatusMessage v-else>
				<img src="/img/icons/sad.png" />
				<p>
					Линкът за активация е невалиден или е изтекъл.
					<br/>
					Поискайте
					<router-link :to="{name: 'resend-activation'}" class="red">нов линк за активация</router-link>
					или се
					<router-link :to="{name: 'contact-us'}" class="red">свържете с нас</router-link>.
				</p>
			</StatusMessage>
		</template>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				tokenChecked: false,
				validToken: false
			};
		},
		created() {
			const { userId, hash } = this.$route.params;

			this.activateUser({ userId, hash }).then((res) => {
				this.tokenChecked = true;
				this.validToken = res.data;

				if (this.validToken) {
					this.setRedirectAfterLogin({ name: 'home' });
				}
			});
		},
		methods: {
			...mapActions('auth', [
				'activateUser',
				'setRedirectAfterLogin'
			]),
			...mapActions('modals', [
				'showLoginModal'
			])
		}
	};
</script>
