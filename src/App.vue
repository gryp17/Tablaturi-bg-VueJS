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
	import axios from 'axios';

	//needed for CORS
	const API = axios.create({ withCredentials: true });

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
				API.get('http://localhost/Tablaturi-bg-API/API/User/isLoggedIn')
					.then((res) => {
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
				API.post('http://localhost/Tablaturi-bg-API/API/User/login', {
					login_username: 'plamen',
					login_password: 1234,
					login_remember_me: true
				})
					.then((res) => {
						if (res.data) {
							this.userSession = res.data;
						}
					})
					.catch((error) => {
						console.log('ERROR:');
						console.log(error);
					});
			},
			logout() {

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
