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
					<div class="views">
						{{ tab.downloads }}
						преглеждания
					</div>

					<!-- edit tab button -->
					<router-link v-if="userSession.ID === tab.uploader_ID" :to="editTabLink" class="red edit-btn">
						<FormButton>
							<i class="fas fa-pencil-alt"></i>
							Редактирай
						</FormButton>
					</router-link>

					<div v-else>
						<!-- add to favourites button -->
						<FavouriteTabButton
							@change="toggleFavouriteTab"
							:favourite="tabIsFavourite"
						/>
						<!--
						<button ng-if="favouriteTabs.indexOf(tab.ID) === -1" id="add-to-favourites-button" class="btn btn-red outline" ng-click="addToFavourites(tab.ID)">
							<span class="glyphicon glyphicon-heart" aria-hidden="true"></span> Добави в любими
						</button>
						-->

						<!-- remove from favourites button -->
						<!--
						<button ng-if="favouriteTabs.indexOf(tab.ID) !== -1" class="btn btn-red" ng-click="removeFromFavourites(tab.ID)">
							<span class="glyphicon glyphicon-heart" aria-hidden="true"></span> Премахни от любими
						</button>
						-->

						<!-- report tab button -->
						<!--
						<button class="btn btn-red outline" id="report-tab-button" ng-click="openReportTabModal()">
							<span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> Докладвай
						</button>
						-->
					</div>
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
				<!-- text tab -->
				<template v-else>
					<div class="tools">
						<FormButton @click="zoom(1)" title="Уголеми шрифта">
							<img src="/img/icons/zoom-in.png" />
						</FormButton>
						<FormButton @click="zoom(-1)" title="Намали шрифта">
							<img src="/img/icons/zoom-out.png" />
						</FormButton>
					</div>

					<pre :style="preStyle" ref="pre">{{ tab.content }}</pre>

					<FormButton @click="downloadTxtFile" class="txt-file-btn">
						<i class="fas fa-file-download"></i>
						Свали като .txt
					</FormButton>

					<div class="hint">
						Ако имате проблем с четенето на таблатурата, кликнете
						<a class="red" :href="`${CDN_URL}/downloads/tabs.pdf`">тук</a> за да разгледате уроците за начинаещи.
					</div>
				</template>
			</div>

			<ShareWidget />

			<CommentsWidget
				:object-id="tab.ID"
				type="tab"
			/>
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import FavouriteTabButton from '@/components/FavouriteTabButton';
	import RedLine from '@/components/RedLine';
	import ShareWidget from '@/components/ShareWidget';
	import CommentsWidget from '@/components/comments/CommentsWidget';

	export default {
		components: {
			FavouriteTabButton,
			RedLine,
			ShareWidget,
			CommentsWidget
		},
		data() {
			return {
				loading: true,
				tabIsFavourite: false,
				fontSize: 13
			};
		},
		computed: {
			...mapState([
				'API_URL',
				'CDN_URL'
			]),
			...mapState('auth', [
				'userSession'
			]),
			...mapState('tabs', [
				'tab'
			]),
			preStyle() {
				return {
					'font-size': `${this.fontSize}px`
				};
			},
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
			editTabLink() {
				return {
					name: 'edit-tab',
					params: {
						id: this.tab.ID
					}
				};
			},
			modifiedDate() {
				return this.$options.filters.date(this.tab.modified_date, 'YYYY-MM-DD в HH:mm');
			},
			gpFileLink() {
				return `${this.API_URL}/Tab/getGpTabFile?tab_id=${this.tab.ID}`;
			},
			txtFileLink() {
				return `${this.API_URL}/Tab/getTextTabFile?tab_id=${this.tab.ID}`;
			}
		},
		created() {
			this.getTabData();
		},
		methods: {
			...mapActions('tabs', [
				'getTab',
				'isFavouriteTab',
				'addFavouriteTab',
				'deleteFavouriteTab'
			]),
			/**
			 * Fetches the tab data
			 */
			getTabData() {
				const tabId = this.$route.params.id;

				Promise.all([
					this.getTab(tabId),
					this.isFavouriteTab(tabId)
				]).then((results) => {
					const data = results[0].data;

					if (data && data.ID) {
						this.tabIsFavourite = results[1].data;
						this.loading = false;
					} else {
						this.$router.push({ name: 'not-found' });
					}
				});
			},
			/**
			 * Increases/decreases the pre font size
			 * @param {Number} amount
			 */
			zoom(amount) {
				this.fontSize = this.fontSize + amount;
			},
			/**
			 * Downloads the guitar pro file in a new tab
			 */
			downloadGpFile() {
				window.open(this.gpFileLink, '_blank');
			},
			/**
			 * Downloads the text tab in a txt file in a new tab
			 */
			downloadTxtFile() {
				window.open(this.txtFileLink, '_blank');
			},
			/**
			 * Toggles the tab favourite status
			 * @param {Boolean} favourite
			 */
			toggleFavouriteTab(favourite) {
				const action = favourite ? this.addFavouriteTab : this.deleteFavouriteTab;

				action(this.tab.ID).then((res) => {
					if (res.data && res.data.success) {
						this.tabIsFavourite = favourite;
					}
				});
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
				display: flex;
				flex-direction: column;
				align-items: flex-end;
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

			.edit-btn {
				margin-top: 10px;
			}
		}

		.tab-content {

			.gp-file-btn, .txt-file-btn {
				display: block;
				margin: 20px auto 0px auto;
			}

			.tools {
				margin-top: 10px;

				.form-button {
					padding: 1px;
					margin-right: 5px;

					img {
						width: 35px;
					}
				}
			}

			pre {
				display: block;
				margin-top: 15px;
				padding: 10px;
				border-radius: 0px;
				white-space: pre-wrap;
				word-wrap: break-word;
				word-break: break-all;
				background-color: $gray-light;
				color: darken($text-color, 15%);
				border: 1px solid $gray;
				font-size: 13px;
			}

			.hint {
				margin-top: 20px;
				font-style: italic;
				text-align: center;
			}
		}
	}
</style>
