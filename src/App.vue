<template>
	<div id="app">

		<div class="main-wrapper">

			<Header />

			<SearchBar />

			<div class="inner-wrapper">
				<aside>
					<a href="mailto:reklama@tablaturi-bg.com">
						<img src="/img/ad-placeholder.png" />
					</a>
				</aside>
				<div class="content-wrapper">
					<div class="view-wrapper">
						<router-view class="view" />
					</div>

					<div class="bottom-banner">
						<a href="mailto:reklama@tablaturi-bg.com">
							<img src="/img/ad-placeholder-horizontal.png"/>
						</a>
					</div>
				</div>
				<aside>
					<a href="mailto:reklama@tablaturi-bg.com">
						<img src="/img/ad-placeholder.png" />
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
	import labelsMap from '@/filters/labelsMap';
	import camelToSnake from '@/filters/camelToSnake';
	import age from '@/filters/age';
	import limitTo from '@/filters/limitTo';
	import emoticons from '@/filters/emoticons';
	import lowercase from '@/filters/lowercase';
	import date from '@/filters/date';
	import FormButton from '@/components/forms/FormButton';
	import FormInput from '@/components/forms/FormInput';
	import FormFileInput from '@/components/forms/FormFileInput';
	import FormDropdown from '@/components/forms/FormDropdown';
	import FormDatepicker from '@/components/forms/FormDatepicker';
	import FormCaptcha from '@/components/forms/FormCaptcha';
	import FormRadioGroup from '@/components/forms/FormRadioGroup';
	import FormAutocompleteInput from '@/components/forms/FormAutocompleteInput';
	import Header from '@/components/header/Header';
	import SearchBar from '@/components/SearchBar';
	import Footer from '@/components/Footer';
	import LoadingIndicator from '@/components/LoadingIndicator';
	import StatusMessage from '@/components/StatusMessage';
	import PageTitle from '@/components/PageTitle';

	//global components/filters
	Vue.filter('errorsMap', errorsMap);
	Vue.filter('labelsMap', labelsMap);
	Vue.filter('camelToSnake', camelToSnake);
	Vue.filter('age', age);
	Vue.filter('limitTo', limitTo);
	Vue.filter('emoticons', emoticons);
	Vue.filter('lowercase', lowercase);
	Vue.filter('date', date);
	Vue.component('FormButton', FormButton);
	Vue.component('FormInput', FormInput);
	Vue.component('FormFileInput', FormFileInput);
	Vue.component('FormDropdown', FormDropdown);
	Vue.component('FormDatepicker', FormDatepicker);
	Vue.component('FormCaptcha', FormCaptcha);
	Vue.component('FormRadioGroup', FormRadioGroup);
	Vue.component('FormAutocompleteInput', FormAutocompleteInput);
	Vue.component('LoadingIndicator', LoadingIndicator);
	Vue.component('StatusMessage', StatusMessage);
	Vue.component('PageTitle', PageTitle);

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
			this.getTabsCount();

			this.getUserSession().then(() => {
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

		> .inner-wrapper {
			display: flex;

			aside {
				margin: 5px;
				width: 120px;
				min-height: 600px;

				img + img {
					margin-top: 5px;
				}
			}

			.content-wrapper {
				margin: 5px 0px;
				width: 100%;

				.view-wrapper {
					min-height: 615px;

					.view {
						padding: 15px;
					}
				}

				.bottom-banner {
					text-align: center;
				}
			}
		}
	}
</style>
