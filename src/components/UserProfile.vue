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
	import { mapState } from 'vuex';

	export default {
		props: {
			user: Object
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			canEdit() {
				return this.user && this.user.ID === this.userSession.ID;
			}
		}
	};
</script>
