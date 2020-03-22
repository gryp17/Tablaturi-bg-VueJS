<template>
	<div class="search-page">
		<template v-if="done">
			<StatusMessage :class="{'has-results': hasResults}">
				<img v-if="!hasResults" src="/img/icons/sad.png" />
				<p>
					{{ title }}
					<span class="search-params">
						<span v-show="band">
							{{ band }}
						</span>
						<span v-show="band && song"> - </span>
						<span v-show="song">
							{{ song }}
						</span>
					</span>
				</p>
			</StatusMessage>

			<template v-if="hasResults">
				<hr />

				<ResultsTable>
					<thead>
						<tr>
							<td>Група</td>
							<td>Песен</td>
							<td>Тип</td>
							<td class="text-center">Рейтинг</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="tab in tabs" :key="tab.ID">
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
		data() {
			return {
				type: this.$route.params.type,
				band: this.$route.params.band,
				song: this.$route.params.song,
				done: false
			};
		},
		computed: {
			...mapState('tabs', {
				tabs: state => state.search.tabs,
				total: state => state.search.total,
				page: state => state.search.page,
				perPage: state => state.search.perPage
			}),
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			},
			hasResults() {
				return this.total > 0;
			},
			title() {
				return this.hasResults ? 'Намерени резултати за' : 'Няма намерени резултати за';
			}
		},
		watch: {
			$route() {
				this.getSearchParams();
				this.getTabs(0);
			}
		},
		created() {
			this.getSearchParams();
			this.getTabs(0).then(() => {
				this.done = true;
			});
		},
		methods: {
			...mapActions('tabs', [
				'search'
			]),
			/**
			 * Parses the route params and stores them in the "data"
			 */
			getSearchParams() {
				this.type = this.$route.params.type;
				this.band = this.$route.params.band !== '*' ? this.$route.params.band : '';
				this.song = this.$route.params.song !== '*' ? this.$route.params.song : '';
			},
			/**
			 * Fetches the tabs by page
			 * @param {Number} page
			 */
			getTabs(page) {
				const params = {
					type: this.type,
					band: this.band,
					song: this.song,
					page
				};

				return this.search(params);
			}
		}
	};
</script>

<style lang="scss">
	.search-page {
		.has-results {
			margin-top: 15px;
		}

		.search-params {
			color: $red;
			font-style: italic;;
		}
	}
</style>
