<template>
	<div id="app">

		<div class="main-wrapper">

			<header class="header">
				<MainMenu/>
				Header content
			</header>

			<div class="search-bar">
				Search bar
			</div>

			{{ userSession }}

			<button v-if="!userSession" @click="login" class="btn btn-success">
				Login
			</button>
			<button v-else @click="logout" class="btn btn-danger">
				Logout
			</button>

			<button @click="getUserSession" class="btn btn-info">
				Get session
			</button>

			<router-view/>

			<footer class="footer">
				Footer
				<router-link :to="{name: 'copyright'}">Copyright</router-link> |
				<router-link :to="{name: 'about-us'}">About Us</router-link>
			</footer>

		</div>

	</div>
</template>

<script>
	import MainMenu from '@/components/MainMenu';
	import UserHttpService from '@/services/user';

	export default {
		components: {
			MainMenu
		},
		data() {
			return {
				userSession: null
			};
		},
		created() {
			this.getUserSession();
		},
		methods: {
			getUserSession() {
				UserHttpService.getSession().then((res) => {
					console.log(res.data);
					if (res.data && res.data.data.user) {
						this.userSession = res.data.data.user;
					}
				})
					.catch((error) => {
						console.log('ERROR:');
						console.log(error);
					});
			},
			login() {
				UserHttpService.login('plamen', 1234, true)
					.then((res) => {
						if (res.data && res.data.data) {
							this.userSession = res.data.data;
						}
					})
					.catch((error) => {
						console.log('ERROR:');
						console.log(error);
					});
			},
			logout() {
				UserHttpService.logout()
					.then((res) => {
						this.userSession = null;
					})
					.catch((error) => {
						console.log('ERROR:');
						console.log(error);
					});
			}
		}
	};
</script>

<style lang="scss">
	.main-wrapper {
		margin: auto;
		width: 1000px;
	}
</style>
