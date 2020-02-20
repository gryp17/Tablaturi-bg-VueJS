<template>
	<div>
		user profile

		<button v-if="canEdit">
			Edit
		</button>

		{{ user }}
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		computed: {
			...mapState('user', [
				'user'
			]),
			...mapState('auth', [
				'userSession'
			]),
			canEdit() {
				return this.user && this.user.ID === this.userSession.ID;
			}
		},
		created() {
			this.getUser(this.$route.params.id).then((res) => {
				if (!res.data || !res.data.ID) {
					this.$router.push({ name: 'not-found' });
				} else {
					this.$emit('ready');
				}
			});
		},
		methods: {
			...mapActions('user', [
				'getUser'
			])
		}
	};
</script>
