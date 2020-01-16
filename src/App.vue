<template>
	<div id="app">

		<div v-if="ready" class="main-wrapper">

			<Header />

			<div class="search-bar">
				Search bar
			</div>

			{{ userSession }}

			<button v-if="!userSession" @click="login({username: 'plamen', password: 1234, rememberMe: true})" class="btn btn-success">
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
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	import errorsMap from '@/filters/errorsMap';
	import FormButton from '@/components/forms/FormButton';
	import Header from '@/components/header/Header';

	//global components/filters
	Vue.filter('errorsMap', errorsMap);
	Vue.component('FormButton', FormButton);

	export default {
		components: {
			Header
		},
		data() {
			return {
				ready: true
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			])
		},
		created() {
			Promise.all([
				this.getUserSession(),
				this.getTabsCount()
			]).then(() => {
				this.ready = true;
			}).catch(() => {
				this.$toasted.global.apiError({
					message: 'Failed to initialize the application'
				});
			});
		},
		methods: {
			...mapActions('auth', [
				'getUserSession',
				'login',
				'logout'
			]),
			...mapActions('tabs', [
				'getTabsCount'
			])
		}
	};
</script>

<style lang="scss">
	.main-wrapper {
		margin: auto;
		width: 1000px;
		border-left: 1px solid $gray-darker;
		border-right: 1px solid $gray-darker;
	}
</style>
