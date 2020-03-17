<template>
	<div class="tab-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			<div class="tab-info">
				<div class="left-wrapper">
					<div class="title">
						<router-link
							:to="tabLink"
							:title="`Всичко от ${tab.band}`"
							class="red"
						>{{ tab.band }}</router-link>
						- {{ tab.song }}
					</div>

					<div class="author">
						<span v-if="tab.upload_date === tab.modified_date">
							качена от
						</span>
						<span v-else>
							обновена от
						</span>

						<router-link :to="uploaderLink" class="red">{{ tab.username }}</router-link>
						на {{ modifiedDate }}
					</div>

					<table class="table table-striped">
						<tbody>
							<tr>
								<td>
									<span class="info-label">Тип:</span>
									{{ tab.tab_type | labelsMap }}
								</td>
							</tr>
							<tr>
								<td>
									<span class="info-label">Тунинг:</span>
									{{ tab.tunning || 'Няма информация' }}
								</td>
							</tr>
							<tr>
								<td>
									<span class="info-label">Трудност:</span>
									{{ tab.difficulty || 'Няма информация' }}
								</td>
							</tr>
						</tbody>
					</table>

				</div>
				<div class="right-wrapper">
					right
				</div>
			</div>

			<RedLine />

			<div class="tab-content">
				<!-- guitar pro tab -->
				<div v-if="tab.type === 'gp'">

					<FormButton @click="downloadGpFile" class="gp-file-btn">
						<i class="fas fa-file-download"></i>
						Свали Guitar Pro таблатурата
					</FormButton>

					<div class="hint">
						Таблатурата е тип Guitar Pro. За повече информация за програмата кликнете
						<router-link
							:to="{
								name: 'guitar-pro'
							}"
							class="red"
						>
							тук
						</router-link>.
					</div>
				</div>
			</div>

			{{ tab }}
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import RedLine from '@/components/RedLine';

	export default {
		components: {
			RedLine
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState([
				'API_URL'
			]),
			...mapState('tabs', [
				'tab'
			]),
			tabLink() {
				return {
					name: 'search',
					params: {
						type: 'all',
						band: this.tab.band,
						song: '*'
					}
				};
			},
			uploaderLink() {
				return {
					name: 'profile',
					params: {
						id: this.tab.uploader_ID
					}
				};
			},
			modifiedDate() {
				return this.$options.filters.date(this.tab.modified_date, 'YYYY-MM-DD в HH:mm');
			},
			gpFileLink() {
				return `${this.API_URL}/Tab/getGpTabFile?tab_id=${this.tab.ID}`;
			}
		},
		created() {
			this.getTabData();
		},
		methods: {
			...mapActions('tabs', [
				'getTab'
			]),
			/**
			 * Fetches the tab data
			 */
			getTabData() {
				return this.getTab(this.$route.params.id).then((res) => {
					const data = res.data;

					if (data && data.ID) {
						this.loading = false;
					} else {
						this.$router.push({ name: 'not-found' });
					}
				});
			},
			/**
			 * Downloads the guitar pro file in a new tab
			 */
			downloadGpFile() {
				window.open(this.gpFileLink, '_blank');
			}
		}
	};
</script>

<style scoped lang="scss">
	.tab-page {
		.tab-info {
			display: flex;
			margin: 10px 0px;

			.left-wrapper {
				width: 60%;
			}

			.right-wrapper {
				flex: 1;
			}

			.title {
				font-size: 18px;
			}

			.author {
				margin-top: 5px;
				font-style: italic;
			}

			table {
				margin-top: 20px;

				td {
					padding: 10px;
				}

				.info-label {
					margin-right: 5px;
					color: $red;
				}
			}
		}

		.tab-content {

			.gp-file-btn {
				display: block;
				margin: 20px auto 0px auto;

				.svg-inline--fa {
					margin-right: 3px;
					margin-bottom: 3px;
				}
			}

			.hint {
				margin-top: 20px;
				font-style: italic;
				text-align: center;
			}
		}
	}
</style>
