<template>
	<div class="user-profile">
		<div class="header">
			<GenderIcon :gender="user.gender" />
			<span class="username">
				{{ user.username }}
			</span>
			<span v-if="isAdmin">
				(Админ)
			</span>

			<FormButton v-if="canEdit" class="edit-btn">
				<i class="fas fa-pencil-alt"></i>
				Редактирай
			</FormButton>

			<FormButton v-else outline class="report-btn">
				<i class="far fa-thumbs-down"></i>
				Докладвай
			</FormButton>
		</div>

		{{ user }}
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import GenderIcon from '@/components/GenderIcon';

	export default {
		components: {
			GenderIcon
		},
		props: {
			user: Object
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			isAdmin() {
				return this.user.type === 'admin';
			},
			canEdit() {
				return this.user && this.user.ID === this.userSession.ID;
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-profile {
		.header {
			.username {
				font-size: 21px;
			}

			.edit-btn, .report-btn {
				float: right;
			}
		}
	}
</style>
