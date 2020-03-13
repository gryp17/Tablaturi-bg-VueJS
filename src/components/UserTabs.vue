<template>
	<div class="user-tabs">
		<template v-if="done">
			<StatusMessage v-if="total === 0">
				<img src="/img/icons/sad.png" />
				<p>
					Потребителят няма качени таблатури
				</p>
			</StatusMessage>

			<ResultsTable v-else>
				<thead>
					<tr>
						<td>Група</td>
						<td>Песен</td>
						<td>Тип</td>
						<td>Рейтинг</td>
						<td v-if="canEdit" class="text-center">
							Редактирай
						</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="tab in userTabs" :key="tab.ID">
						<td>
							<router-link
								:to="{
									name: 'search',
									params: {
										type: 'all',
										band: tab.band,
										song: '*'
									}
								}"
								:title="`Всичко от ${tab.band}`"
								class="red"
							>
								{{ tab.band }}
							</router-link>
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
						<td>
							<TabRating :rating="tab.rating" />
						</td>
						<td v-if="canEdit" class="text-center">
							<router-link
								:to="{name: 'edit-tab', params: {id: tab.ID}}"
							>
								<FormButton transparent title="Редактирай">
									<i class="fas fa-pencil-alt"></i>
								</FormButton>
							</router-link>
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
	import TabRating from '@/components/TabRating';

	export default {
		components: {
			ResultsTable,
			Pagination,
			TabRating
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
				userTabs: state => state.userTabs.tabs,
				total: state => state.userTabs.total,
				page: state => state.userTabs.page,
				perPage: state => state.userTabs.perPage
			}),
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			},
			canEdit() {
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
				'getUserTabs'
			]),
			/**
			 * Fetches the tabs by page
			 * @param {Number} page
			 */
			getTabs(page) {
				const params = {
					id: this.userId,
					page
				};

				return this.getUserTabs(params);
			}
		}
	};
</script>
