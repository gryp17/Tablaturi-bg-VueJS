<template>
	<div class="profile-page">

		<LoadingIndicator v-show="!doneLoading" />
		<div v-show="doneLoading">
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
					<li class="nav-item">
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
						<UserProfile @ready="componentIsReady"/>
					</div>
					<div class="tab-pane fade" id="user-tabs" role="tabpanel" aria-labelledby="user-tabs-tab">
						<UserTabs @ready="componentIsReady"/>
					</div>
					<div class="tab-pane fade" id="favourite-tabs" role="tabpanel" aria-labelledby="favourite-tabs-tab">
						<UserFavourites @ready="componentIsReady"/>
					</div>
					<div class="tab-pane fade" id="user-search" role="tabpanel" aria-labelledby="user-search-tab">
						user search
					</div>
					<div class="tab-pane fade" id="add-article" role="tabpanel" aria-labelledby="add-article-tab">
						add article
					</div>
				</template>
			</TabsNav>
		</div>
	</div>
</template>

<script>
	import TabsNav from '@/components/TabsNav';
	import UserProfile from '@/components/UserProfile';
	import UserTabs from '@/components/UserTabs';
	import UserFavourites from '@/components/UserFavourites';

	export default {
		components: {
			TabsNav,
			UserProfile,
			UserTabs,
			UserFavourites
		},
		data() {
			return {
				asyncComponents: 3,
				readyComponents: 0
			};
		},
		computed: {
			doneLoading() {
				return this.readyComponents === this.asyncComponents;
			}
		},
		methods: {
			componentIsReady() {
				this.readyComponents++;
			}
		}
	};
</script>
