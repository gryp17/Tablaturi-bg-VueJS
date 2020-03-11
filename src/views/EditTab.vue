<template>
	<div class="edit-tab-page">
		<LoadingIndicator v-if="loading" />
		<TabForm v-else :tab="tab" />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import TabForm from '@/components/TabForm';

	export default {
		components: {
			TabForm
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState('tabs', [
				'tab'
			]),
		},
		created() {
			this.getTabData();
		},
		methods: {
			...mapActions('tabs', [
				'getTab'
			]),
			/**
			 * Fetches the tab data
			 */
			getTabData() {
				this.getTab(this.$route.params.id).then((res) => {
					const data = res.data;

					if (data && data.ID) {
						//check if this tab belongs to the logged in user
						if (data.uploader_ID !== this.userSession.ID) {
							this.$router.push({ name: 'unauthorized' });
						} else {
							this.loading = false;
						}
					} else {
						this.$router.push({ name: 'not-found' });
					}
				});
			}
		}
	};
</script>
