<template>
	<div class="user-favourites">
		<template v-if="done">
			<StatusMessage v-if="total === 0">
				<img src="/img/icons/sad.png" />
				<p>
					Потребителят няма любими таблатури
				</p>
			</StatusMessage>

			<ResultsTable v-else>
				<thead>
					<tr>
						<td>Група</td>
						<td>Песен</td>
						<td>Тип</td>
						<td v-if="canRemove" class="text-center">
							Премахни
						</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="tab in userFavourites" :key="tab.ID">
						<td>
							<!-- TODO: this needs to be a link with title="Всичко от band name" -->
							{{ tab.band }}
						</td>
						<td>
							<router-link
								:to="{name: 'tab', params: {id: tab.ID}}"
								:title="`${tab.band} - ${tab.song}`"
								class="red"
							>
								{{ tab.song }}
								<span v-show="tab.tab_type !== 'full song'">({{ tab.tab_type | labelsMap | lowercase }})</span>
							</router-link>
						</td>
						<td>
							{{ tab.type | labelsMap }}
						</td>
						<td v-if="canRemove" class="text-center">
							<FormButton
								@click="removeFromFavourites(tab.ID)"
								transparent
								title="Премахни от любими"
							>
								<i class="fas fa-times"></i>
							</FormButton>
						</td>
					</tr>
				</tbody>
			</ResultsTable>

			<Pagination
				v-show="totalPages > 1"
				:total-pages="totalPages"
				:current-page="page"
				@change-page="getTabs"
			/>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import ResultsTable from '@/components/ResultsTable';
	import Pagination from '@/components/Pagination';

	export default {
		components: {
			ResultsTable,
			Pagination
		},
		props: {
			userId: Number
		},
		data() {
			return {
				done: false
			};
		},
		computed: {
			...mapState('auth', [
				'userSession'
			]),
			...mapState('tabs', {
				userFavourites: state => state.userFavourites.tabs,
				total: state => state.userFavourites.total,
				page: state => state.userFavourites.page,
				perPage: state => state.userFavourites.perPage
			}),
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			},
			canRemove() {
				return this.userId === this.userSession.ID;
			}
		},
		created() {
			this.getTabs(0).then(() => {
				this.done = true;
			});
		},
		methods: {
			...mapActions('tabs', [
				'getUserFavouriteTabs',
				'deleteFavouriteTab'
			]),
			/**
			 * Fetches the favourite tabs by page
			 * @param {Number} page
			 */
			getTabs(page) {
				const params = {
					id: this.userId,
					page
				};

				return this.getUserFavouriteTabs(params);
			},
			/**
			 * Removes the tab from the user favourites list
			 * @param {Number} tabId
			 */
			removeFromFavourites(tabId) {
				this.deleteFavouriteTab(tabId).then((res) => {
					const data = res.data;

					if (data.success) {
						this.getTabs(0);
					}
				});
			}
		}
	};
</script>
