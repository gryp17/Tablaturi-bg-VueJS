<template>
	<div class="tabs-page">
		<LoadingIndicator v-if="!done" />
		<div v-else class="tables-wrapper">

			<!-- popular -->
			<div class="top-table">
				<div class="header">
					<img src="/img/top-icons/zoom.png" />
					Най-търсени
				</div>
				<hr/>
				<ResultsTable>
					<thead>
						<tr>
							<td>Песен</td>
							<td>Посещения</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="tab in popular" :key="tab.ID">
							<td>
								<router-link
									:to="{name: 'tab', params: {id: tab.ID}}"
									:title="`${tab.band} - ${tab.song}`"
									class="red"
								>
									{{tab.band}} - {{ tab.song }}
								</router-link>
							</td>
							<td>
								{{ tab.downloads }}
							</td>
						</tr>
					</tbody>
				</ResultsTable>
			</div>

			<!-- liked -->
			<div class="top-table">
				<div class="header">
					<img src="/img/top-icons/thumbs-up.png" />
					Най-харесвани
				</div>
				<hr/>
				<ResultsTable>
					<thead>
						<tr>
							<td>Песен</td>
							<td>Рейтинг</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="tab in popular" :key="tab.ID">
							<td>
								<router-link
									:to="{name: 'tab', params: {id: tab.ID}}"
									:title="`${tab.band} - ${tab.song}`"
									class="red"
								>
									{{tab.band}} - {{ tab.song }}
								</router-link>
							</td>
							<td>
								<TabRating :rating="tab.rating" />
							</td>
						</tr>
					</tbody>
				</ResultsTable>
			</div>

			<div class="top-table">
				<div class="header">
					<img src="/img/top-icons/calendar.png" />
					Най-нови
				</div>
				<hr/>
				<ResultsTable>

				</ResultsTable>
			</div>

			<div class="top-table">
				<div class="header">
					<img src="/img/top-icons/comment.png" />
					Най-коментирани
				</div>
				<hr/>
				<ResultsTable>

				</ResultsTable>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ResultsTable from '@/components/ResultsTable';
	import TabRating from '@/components/TabRating';

	export default {
		components: {
			ResultsTable,
			TabRating
		},
		data() {
			return {
				done: false
			};
		},
		computed: {
			...mapState('tabs', {
				popular: state => state.most.popular,
				liked: state => state.most.liked,
				latest: state => state.most.latest,
				commented: state => state.most.commented
			}),
		},
		created() {
			Promise.all([
				this.getMost('popular'),
				this.getMost('liked'),
				this.getMost('latest'),
				this.getMost('commented')
			]).then(() => {
				this.done = true;
			});
		},
		methods: {
			...mapActions('tabs', [
				'getMost'
			])
		}
	};
</script>

<style lang="scss">
	.tabs-page {
		.tables-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.top-table {
				margin: 10px;
				width: 47%;
				border: 1px solid $gray;

				.header {
					position: relative;
					min-height: 70px;
					line-height: 70px;
					font-size: 18px;
					text-align: center;

					img {
						position: absolute;
						left: 0;
						width: 70px;
					}
				}

				hr {
					width: 90%;
					margin: auto;
					margin-top: 5px;
				}

				table {
					margin-bottom: 0px;

					thead {
						td {
							font-weight: 600;
						}
					}

					td {
						color: $text-color;

						&:first-child {
							width: 100%;
						}

						&:last-child {
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
