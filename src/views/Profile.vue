<template>
	<div class="profile-page">

		<LoadingIndicator v-if="loading" />
		<div v-else>
			<TabsNav>
				<template v-slot:items>
					<li class="nav-item">
						<a
							class="nav-link active"
							id="profile-tab"
							data-toggle="tab"
							href="#profile"
							role="tab"
							aria-controls="profile"
							aria-selected="true"
						>
							Профил
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							id="user-tabs-tab"
							data-toggle="tab"
							href="#user-tabs"
							role="tab"
							aria-controls="user-tabs"
							aria-selected="true"
						>
							Качени таблатури
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							id="favourite-tabs-tab"
							data-toggle="tab"
							href="#favourite-tabs"
							role="tab"
							aria-controls="favourite-tabs"
							aria-selected="true"
						>
							Любими таблатури
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							id="user-search-tab"
							data-toggle="tab"
							href="#user-search"
							role="tab"
							aria-controls="user-search"
							aria-selected="true"
						>
							Търси потребители
						</a>
					</li>
					<li v-show="isAdmin" class="nav-item">
						<a
							class="nav-link"
							id="add-article-tab"
							data-toggle="tab"
							href="#add-article"
							role="tab"
							aria-controls="add-article"
							aria-selected="true"
						>
							Качи новина
						</a>
					</li>
				</template>
				<template v-slot:content>
					<div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
						<UserProfile :user="user" />
					</div>
					<div class="tab-pane fade" id="user-tabs" role="tabpanel" aria-labelledby="user-tabs-tab">
						<UserTabs />
					</div>
					<div class="tab-pane fade" id="favourite-tabs" role="tabpanel" aria-labelledby="favourite-tabs-tab">
						<UserFavourites />
					</div>
					<div class="tab-pane fade" id="user-search" role="tabpanel" aria-labelledby="user-search-tab">
						<UserSearch />
					</div>
					<div class="tab-pane fade" id="add-article" role="tabpanel" aria-labelledby="add-article-tab">
						<AddArticle />
					</div>
				</template>
			</TabsNav>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';

	import TabsNav from '@/components/TabsNav';
	import UserProfile from '@/components/UserProfile';
	import UserTabs from '@/components/UserTabs';
	import UserFavourites from '@/components/UserFavourites';
	import UserSearch from '@/components/UserSearch';
	import AddArticle from '@/components/AddArticle';

	export default {
		components: {
			TabsNav,
			UserProfile,
			UserTabs,
			UserFavourites,
			UserSearch,
			AddArticle
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('user', [
				'user'
			]),
			...mapGetters('auth', [
				'isAdmin'
			])
		},
		watch: {
			$route(route, prevRoute) {
				if (route.params.id !== prevRoute.params.id) {
					this.getUserData();
				}
			}
		},
		created() {
			this.getUserData();
		},
		methods: {
			...mapActions('user', [
				'getUser'
			]),
			/**
			 * Fetches the user data for the specified id
			 */
			getUserData() {
				this.loading = true;

				this.getUser(this.$route.params.id).then((res) => {
					if (!res.data || !res.data.ID) {
						this.$router.push({ name: 'not-found' });
					} else {
						this.loading = false;
					}
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.profile-page {
		.tab-pane {
			padding-top: 15px;
		}
	}
</style>
