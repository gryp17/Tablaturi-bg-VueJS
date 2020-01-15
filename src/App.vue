<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>

		{{ userSession }}

		<button v-if="!userSession" @click="login">
			Login
		</button>
		<button v-else @click="logout">
			Logout
		</button>

		<button @click="getUserSession">
			Get session
		</button>

		<router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
