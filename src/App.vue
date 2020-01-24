<template>
	<div id="app">

		<div v-show="appIsReady" class="main-wrapper">

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

			<Footer />

		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';

	import errorsMap from '@/filters/errorsMap';
	import FormButton from '@/components/forms/FormButton';
	import FormInput from '@/components/forms/FormInput';
	import FormFileInput from '@/components/forms/FormFileInput';
	import Header from '@/components/header/Header';
	import SearchBar from '@/components/SearchBar';
	import Footer from '@/components/Footer';

	//global components/filters
	Vue.filter('errorsMap', errorsMap);
	Vue.component('FormButton', FormButton);
	Vue.component('FormInput', FormInput);
	Vue.component('FormFileInput', FormFileInput);

	export default {
		components: {
			Header,
			SearchBar,
			Footer
		},
		computed: {
			...mapState([
				'appIsReady'
			]),
			...mapState('auth', [
				'userSession'
			])
		},
		created() {
			Promise.all([
				this.getUserSession(),
				this.getTabsCount()
			]).then(() => {
				this.setAppAsReady();
			}).catch(() => {
				this.$toasted.global.apiError({
					message: 'Failed to initialize the application'
				});
			});
		},
		methods: {
			...mapActions([
				'setAppAsReady'
			]),
			...mapActions('auth', [
				'getUserSession'
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
