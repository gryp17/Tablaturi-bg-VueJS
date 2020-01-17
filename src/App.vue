<template>
	<div id="app">

		<div v-if="ready" class="main-wrapper">

			<Header />

			<SearchBar />

			<div class="inner-wrapper">
				<aside>
					<a href="mailto:reklama@tablaturi-bg.com">
						<img src="/img/ad-placeholder.png"/>
					</a>
				</aside>
				<div class="view-wrapper">
					<router-view class="view" />

					<div class="bottom-banner">
						<a href="mailto:reklama@tablaturi-bg.com">
							<img src="/img/ad-placeholder-horizontal.png"/>
						</a>
					</div>
				</div>
				<aside>
					<a href="mailto:reklama@tablaturi-bg.com">
						<img src="/img/ad-placeholder.png"/>
					</a>
				</aside>
			</div>

			<!--
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
			-->

			<Footer />

		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	import errorsMap from '@/filters/errorsMap';
	import FormButton from '@/components/forms/FormButton';
	import Header from '@/components/header/Header';
	import SearchBar from '@/components/SearchBar';
	import Footer from '@/components/Footer';

	//global components/filters
	Vue.filter('errorsMap', errorsMap);
	Vue.component('FormButton', FormButton);

	export default {
		components: {
			Header,
			SearchBar,
			Footer
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
		background-color: $white;

		.inner-wrapper {
			display: flex;

			aside {
				margin: 5px;
				width: 120px;
				min-height: 600px;
			}

			.view-wrapper {
				margin: 5px 0px;
				width: 100%;

				.view {
					min-height: 615px;
					padding: 10px;
				}

				.bottom-banner {
					text-align: center;
				}
			}
		}
	}
</style>
