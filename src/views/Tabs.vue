<template>
	<div class="tabs-page">
		<LoadingIndicator v-if="!done"/>
		<template v-else>
			{{ popular }}
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				done: false
			};
		},
		computed: {
			...mapState('tabs', {
				popular: state => state.most.popular,
				liked: state => state.most.liked,
				latest: state => state.most.latest,
				commented: state => state.most.commented
			}),
		},
		created() {
			Promise.all([
				this.getMost('popular'),
				this.getMost('liked'),
				this.getMost('latest'),
				this.getMost('commented')
			]).then(() => {
				this.done = true;
			});
		},
		methods: {
			...mapActions('tabs', [
				'getMost'
			])
		}
	};
</script>
