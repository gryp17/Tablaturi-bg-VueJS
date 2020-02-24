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

			<FormButton v-if="canEdit" @click="showEditProfileModal" class="edit-btn">
				<i class="fas fa-pencil-alt"></i>
				Редактирай
			</FormButton>

			<FormButton v-else outline class="report-btn">
				<i class="far fa-thumbs-down"></i>
				Докладвай
			</FormButton>
		</div>

		<div class="table-wrapper">
			<img :src="`${CDN_URL}/avatars/${user.photo}`" class="user-avatar" />

			<div class="table-wrapper-inner">
				<table class="table table-striped">
					<tbody>
						<tr>
							<td>
								<span class="info-label">Репутация:</span>
								{{ user.reputation }}

								<PopoverButton>
									<template v-slot:button>
										<i class="fas fa-info-circle"></i>
									</template>
									<template v-slot:content>
										<div>
											<strong>Репутация се натрупва чрез:</strong>
										</div>
										- писане на коментар 1 точка <br/>
										- оценка на таблатура 1 точка <br/>
										- качване на таблатура 10 точки
									</template>
								</PopoverButton>
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">{{ registeredText }}</span>
								{{ registeredDate }}
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">{{ lastActiveText }}</span>
								{{ lastActiveDate }}
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">Възраст:</span>
								{{ age }} години
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">Местоживеене:</span>
								{{ user.location || 'Няма информация' }}
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">Професия:</span>
								{{ user.occupation || 'Няма информация' }}
							</td>
						</tr>
						<tr>
							<td>
								<span class="info-label">Web:</span>
								<a v-if="user.web" :href="user.web" class="red" target="_blank">{{ user.web }}</a>
								<template v-else>
									Няма информация
								</template>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="info-box">
			<div class="red-line"></div>
			<div class="info">
				<span class="info-label">За мен:</span>
				{{ user.about_me || 'Няма информация' }}
			</div>
		</div>

		<div class="info-box">
			<div class="red-line"></div>
			<div class="info">
				<span class="info-label">Инструменти/Екипировка:</span>
				{{ user.instrument || 'Няма информация' }}
			</div>
		</div>

		<div class="info-box">
			<div class="red-line"></div>
			<div class="info">
				<span class="info-label">Любими групи/музиканти:</span>
				{{ user.favourite_bands || 'Няма информация' }}
			</div>
		</div>

		<EditProfileModal :user="userSession"/>
	</div>
</template>

<script>
	import moment from 'moment';
	import { mapState, mapActions } from 'vuex';

	import GenderIcon from '@/components/GenderIcon';
	import PopoverButton from '@/components/PopoverButton';
	import EditProfileModal from '@/components/modals/EditProfileModal';

	export default {
		components: {
			GenderIcon,
			PopoverButton,
			EditProfileModal
		},
		props: {
			user: Object
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState([
				'CDN_URL'
			]),
			registeredText() {
				return this.user.gender === 'M' ? 'Регистриран на:' : 'Регистриранa на:';
			},
			registeredDate() {
				return moment(this.user.register_date).format('YYYY-MM-DD в HH:mm');
			},
			lastActiveText() {
				return this.user.gender === 'M' ? 'Последно активен на:' : 'Последно активна на:';
			},
			lastActiveDate() {
				return moment(this.user.last_active_date).format('YYYY-MM-DD в HH:mm');
			},
			age() {
				return moment().diff(moment(this.user.birthday), 'years');
			},
			isAdmin() {
				return this.user.type === 'admin';
			},
			canEdit() {
				return this.user && this.user.ID === this.userSession.ID;
			}
		},
		methods: {
			...mapActions('modals', [
				'showEditProfileModal'
			]),
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

		.info-label {
			margin-right: 5px;
			color: $red;
		}

		.fa-info-circle {
			font-size: 16px;
			color: $blue-light;
			cursor: pointer;
		}

		.table-wrapper {
			display: flex;
			margin-top: 20px;

			.user-avatar {
				align-self: center;
				margin-right: 20px;
				width: 200px;
				height: 200px;
				border-radius: 100%;
			}

			.table-wrapper-inner {
				flex: 1;
				padding-left: 20px;
				border-left: solid 3px $red;

				.table {
					margin-bottom: 0;

					td {
						padding: 10px;
					}
				}
			}
		}

		.info-box {
			margin-top: 30px;
			background-color: #f9f9f9;

			.red-line {
				background: linear-gradient(to right, $red 0%, $red 49%, $white 100%);
				height: 3px;
				margin: 0px;
			}

			.info {
				padding: 10px 20px;
				min-height: 100px;
			}
		}
	}
</style>