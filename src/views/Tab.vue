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
					<router-link v-if="canEdit" :to="editTabLink" class="red edit-btn">
						<FormButton>
							<i class="fas fa-pencil-alt"></i>
							Редактирай
						</FormButton>
					</router-link>

					<div v-if="showTabActions" class="tab-actions">
						<!-- add to favourites button -->
						<PopoverWrapper :disabled="!isLoggedIn">
							<template v-slot:button>
								<FavouriteTabButton
									@click="toggleFavouriteTab"
									:disabled="!isLoggedIn"
									:favourite="tabIsFavourite"
								/>
							</template>
							<template v-slot:content>
								<a @click.prevent="showSignupModal()" href="#" class="red">Регистрирай се</a>
								или
								<a @click.prevent="showLoginModal()" href="#" class="red">влез</a>, за да добавиш таблатурата в любими.
							</template>
						</PopoverWrapper>

						<!-- report tab button -->
						<PopoverWrapper :disabled="!isLoggedIn">
							<template v-slot:button>
								<ReportTabButton
									@click="showReportTabModal"
									:disabled="!isLoggedIn"
								/>
							</template>
							<template v-slot:content>
								<a @click.prevent="showSignupModal()" href="#" class="red">Регистрирай се</a>
								или
								<a @click.prevent="showLoginModal()" href="#" class="red">влез</a>, за да докладваш таблатурата.
							</template>
						</PopoverWrapper>

						<!-- rate tab -->
						<PopoverWrapper :disabled="!isLoggedIn || rated">
							<template v-slot:button>
								<TabRating
									:rating="ratedAs || tab.rating"
									:disabled="!isLoggedIn"
									:editable="ratingEditable"
									label="Оцени"
									@rate="onRateTab"
								/>
							</template>
							<template v-slot:content>
								<template v-if="!rated">
									<a @click.prevent="showSignupModal()" href="#" class="red">Регистрирай се</a>
									или
									<a @click.prevent="showLoginModal()" href="#" class="red">влез</a>, за да оцениш таблатурата.
								</template>
								<template v-else>
									Вече си оценил таблатурата.
								</template>
							</template>
						</PopoverWrapper>
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

			<ReportTabModal :tab="tab" />
		</template>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';

	import FavouriteTabButton from '@/components/tab/FavouriteTabButton';
	import ReportTabButton from '@/components/tab/ReportTabButton';
	import PopoverWrapper from '@/components/tab/PopoverWrapper';
	import RedLine from '@/components/RedLine';
	import ShareWidget from '@/components/ShareWidget';
	import CommentsWidget from '@/components/comments/CommentsWidget';
	import ReportTabModal from '@/components/modals/ReportTabModal';
	import TabRating from '@/components/TabRating';

	export default {
		components: {
			FavouriteTabButton,
			ReportTabButton,
			PopoverWrapper,
			RedLine,
			ShareWidget,
			CommentsWidget,
			ReportTabModal,
			TabRating
		},
		data() {
			return {
				loading: true,
				tabIsFavourite: false,
				fontSize: 13,
				rated: false,
				ratedAs: null,
				ratingEditable: true
			};
		},
		computed: {
			...mapState([
				'API_URL',
				'CDN_URL'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			]),
			...mapState('auth', [
				'userSession'
			]),
			...mapState('tabs', [
				'tab'
			]),
			canEdit() {
				return this.isLoggedIn && this.userSession.ID === this.tab.uploader_ID;
			},
			showTabActions() {
				return !this.isLoggedIn || (this.userSession.ID !== this.tab.uploader_ID);
			},
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
		watch: {
			userSession() {
				this.getSecondaryData();
			}
		},
		methods: {
			...mapActions('modals', [
				'showLoginModal',
				'showSignupModal',
				'showReportTabModal'
			]),
			...mapActions('tabs', [
				'getTab',
				'isFavouriteTab',
				'addFavouriteTab',
				'deleteFavouriteTab',
				'tabIsRated',
				'rateTab'
			]),
			/**
			 * Fetches the tab data
			 */
			getTabData() {
				const tabId = this.$route.params.id;

				this.getTab(tabId).then((res) => {
					const data = res.data;

					if (!data || !data.ID) {
						return this.$router.push({ name: 'not-found' });
					}

					if (this.isLoggedIn) {
						this.getSecondaryData().then(() => {
							this.loading = false;
						});
					} else {
						this.loading = false;
					}
				});
			},
			/**
			 * Fetches the secondary data such as favourite and rated status
			 * @returns {Promise}
			 */
			getSecondaryData() {
				const tabId = this.$route.params.id;

				return Promise.all([
					this.isFavouriteTab(tabId),
					this.tabIsRated(tabId)
				]).then((results) => {
					this.tabIsFavourite = results[0] ? results[0].data : false;
					this.rated = results[1] ? results[1].data : false;
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
			},
			/**
			 * Rates the tab
			 * @param {Number} rating
			 */
			onRateTab(rating) {
				const params = {
					tabId: this.tab.ID,
					rating
				};

				this.rateTab(params).then((res) => {
					const data = res.data;

					if (data.success) {
						this.rated = true;
						this.ratedAs = rating;
						this.ratingEditable = false;
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

			.views {
				text-align: right;
			}

			.edit-btn {
				float: right;
				margin-top: 10px;
			}

			.tab-actions {
				text-align: right;

				.popover-wrapper {
					float: right;
					margin-top: 10px;
					clear: both;
				}
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
