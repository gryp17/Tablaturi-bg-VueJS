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
						<td v-if="canEdit">Редактирай</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="tab in userTabs" :key="tab.ID">
						<td>
							<!-- TODO: this needs to be a link -->
							{{ tab.band }}
						</td>
						<td>
							<router-link :to="{name: 'tab', params: {id: tab.ID}}" class="red">
								{{ tab.song }}
								<!--
									TODO: add the tab type here
									<span ng-show="tab.tab_type !== 'full song'">({{tab.tab_type | tabContentType}})</span>
								-->
							</router-link>
						</td>
						<td>
							{{ tab.type }}
							<!-- TODO: this tab needs to be converted as well -->
						</td>
						<td>
							{{ tab.rating }}
						</td>
						<td v-if="canEdit">
							edit
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

<style scoped lang="scss">

</style>
