<template>
	<div class="top-tabs-table">
		<div class="header">
			<img :src="icon" />
			{{ title }}
		</div>
		<hr/>
		<ResultsTable>
			<thead>
				<tr>
					<td>Песен</td>
					<td>
						{{ label }}
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="tab in tabs" :key="tab.ID">
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
						<template v-if="type === 'popular'">
							{{ tab.downloads }}
						</template>
						<template v-if="type === 'liked'">
							<TabRating :rating="tab.rating" />
						</template>
						<template v-if="type === 'latest'">
							{{ tab.upload_date | date }}
						</template>
						<template v-if="type === 'commented'">
							{{ tab.comments }}
						</template>
					</td>
				</tr>
			</tbody>
		</ResultsTable>
	</div>
</template>

<script>
	import ResultsTable from '@/components/ResultsTable';
	import TabRating from '@/components/TabRating';

	export default {
		components: {
			ResultsTable,
			TabRating
		},
		props: {
			type: {
				type: String,
				required: true,
				validator(value) {
					return ['popular', 'liked', 'latest', 'commented'].includes(value);
				}
			},
			tabs: Array
		},
		data() {
			return {
				statsMap: {
					popular: {
						icon: 'zoom.png',
						title: 'Най-търсени',
						label: 'Посещения'
					},
					liked: {
						icon: 'thumbs-up.png',
						title: 'Най-харесвани',
						label: 'Рейтинг'
					},
					latest: {
						icon: 'calendar.png',
						title: 'Най-нови',
						label: 'Дата'
					},
					commented: {
						icon: 'comment.png',
						title: 'Най-коментирани',
						label: 'Коментари'
					}
				}
			};
		},
		computed: {
			config() {
				return this.statsMap[this.type];
			},
			icon() {
				return `/img/top-icons/${this.config.icon}`;
			},
			title() {
				return this.config.title;
			},
			label() {
				return this.config.label;
			}
		}
	};
</script>

<style lang="scss">
	.top-tabs-table {
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

		.results-table {
			margin-bottom: 0px;

			thead {
				td {
					font-weight: 600;
				}
			}

			td {
				color: $text-color;
				padding-top: 0;
				padding-bottom: 0;
				height: 65px;

				&:first-child {
					width: 100%;
				}

				&:last-child {
					min-width: 100px;
					text-align: center;
				}
			}
		}
	}
</style>
