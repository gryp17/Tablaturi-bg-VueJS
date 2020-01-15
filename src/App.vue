<template>
	<div id="app">

		<div class="main-wrapper">

			<header class="header">
				<div class="main-menu">
					Main menu
					<div id="nav">
						<router-link :to="{name: 'home'}">Home</router-link> |
						<router-link :to="{name: 'articles'}">Articles</router-link> |
						<router-link :to="{name: 'tabs'}">Tabs</router-link> |
						<router-link :to="{name: 'guitar-pro'}">Guitar Pro</router-link> |
						<router-link :to="{name: 'add-tab'}">Add Tab</router-link> |
						<router-link :to="{name: 'usefull'}">Usefull</router-link> |
						<router-link :to="{name: 'contact-us'}">Contact Us</router-link> |
						<router-link :to="{name: 'copyright'}">Copyright</router-link> |
						<router-link :to="{name: 'about-us'}">About Us</router-link>
					</div>
				</div>
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
			</footer>

		</div>

	</div>
</template>

<script>
	import UserHttpService from '@/services/user';

	export default {
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
	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
