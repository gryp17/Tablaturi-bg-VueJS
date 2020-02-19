<template>
	<div class="usefull-page">
		<PageTitle>
			Полезно
		</PageTitle>

		<ul class="nav nav-tabs nav-fill" role="tablist">
			<li class="nav-item">
				<a
					class="nav-link active"
					id="software-tab"
					data-toggle="tab"
					href="#software"
					role="tab"
					aria-controls="software"
					aria-selected="true"
				>
					Полезни програми
				</a>
			</li>
			<li class="nav-item">
				<a
					class="nav-link"
					id="lessons-tab"
					data-toggle="tab"
					href="#lessons"
					role="tab"
					aria-controls="lessons"
					aria-selected="false"
				>
					Уроци за начинаещи
				</a>
			</li>
			<li class="nav-item">
				<a
					class="nav-link"
					id="video-lessons-tab"
					data-toggle="tab"
					href="#video-lessons"
					role="tab"
					aria-controls="activity"
					aria-selected="false"
				>
					Видео уроци
				</a>
			</li>
		</ul>

		<div class="tab-content">
			<!-- software tab -->
			<div class="tab-pane fade show active" id="software" role="tabpanel" aria-labelledby="software-tab">
				<div class="usefull-item">
					<img src="/img/usefull/tuxguitar.png" />
					<div class="description">
						<h5>
							<a class="red" href="http://www.tuxguitar.com.ar/download.html" target="_blank">TuxGuitar</a>
						</h5>
						TuxGuitar e безплатна алтернатива на известната програма за таблатури и партитури - Guitar Pro.
						Софтуерът служи за създаване, редактиране и преслушване на таблатури.
						С него можете да отваряте и обработвате всички файлове генерирани от Guitar Pro - .tg, .gp3, gp.4, .gp5, .ptb.
					</div>
				</div>

				<div class="usefull-item">
					<img src="/img/usefull/aptuner.jpg" />
					<div class="description">
						<h5>
							<a class="red" href="https://ap-tuner.en.softonic.com/" target="_blank">APTuner</a>
						</h5>
						APTuner е безплатна програма за бързо и лесно настройване на китара като може да се използва както на компютър, така и на таблет или смартфон.
					</div>
				</div>

				<div class="usefull-item">
					<img src="/img/usefull/audacity.jpg" />
					<div class="description">
						<h5>
							<a class="red" href="http://audacity.sourceforge.net/download/" target="_blank">Audacity</a>
						</h5>
						Audacity e безплатна програма за обработка и запис на аудио. Може да се използва и като виртуален усилвател с подходящите за целта plugin-и.
					</div>
				</div>
			</div>
			<!-- lessons tab -->
			<div class="tab-pane fade" id="lessons" role="tabpanel" aria-labelledby="lessons-tab">
				<div class="usefull-item">
					<img src="/img/usefull/lessons.jpg" />
					<div class="description">
						<h5>
							<a class="red" :href="`${CDN_URL}/downloads/lessons.pdf`">Уроци по китара (Скот Фритцингер)</a>
						</h5>
						Уроците включват основна теория по китара, техника за свирене, както и информация за акордите, техните прогресии и вариации.
					</div>
				</div>
				<div class="usefull-item">
					<img src="/img/usefull/tab.jpg" />
					<div class="description">
						<h5>
							<a class="red" :href="`${CDN_URL}/downloads/tabs.pdf`">Писане и четене на таблатури (Хауърд Райт)</a>
						</h5>
						Урокът обяснява какво представляват таблатурите, как се четат и пишат и най-често използваните символи.
					</div>
				</div>
			</div>
			<!-- video lessons tab -->
			<div class="tab-pane fade" id="video-lessons" role="tabpanel" aria-labelledby="video-lessons-tab">

				<h5>
					<a class="red" href="http://www.guitarjamz.com" target="_blank">Видео уроци от Марти Шварц</a>
				</h5>

				<div class="videos-wrapper">
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=guitarjamzdotcom" width="340" height="390"></iframe>
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=martyzsongs" width="340" height="390"></iframe>
				</div>

				<hr/>

				<h5>
					Още видео уроци
				</h5>

				<div class="videos-wrapper">
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=JustinSandercoeSongs" width="340" height="390"></iframe>
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=guitarlessonscom" width="340" height="390"></iframe>

					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=tripfuse04" width="340" height="390"></iframe>
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=educationalmaterials" width="340" height="390"></iframe>

					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=KristoferDahl" width="340" height="390"></iframe>
					<iframe src="http://www.youtube.com/embed/?listType=user_uploads&list=SteveTerreberry" width="340" height="390"></iframe>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState([
				'CDN_URL'
			])
		}
	};
</script>

<style scoped lang="scss">
	.usefull-page {

		.nav-item {
			flex: 1;

			.nav-link {
				color: $text-color;

				&.active {
					font-weight: bold;
					color: $red;
				}
			}
		}

		.usefull-item {
			display: flex;
			padding: 20px 0px;

			img {
				width: 150px;
			}

			.description {
				flex: 1;
				padding-left: 10px;
			}

			+ .usefull-item {
				border-top: solid 1px $gray;
			}
		}

		#video-lessons {
			padding-top: 10px;

			h5 {
				margin: 10px 0px;
				text-align: center;
			}

			.videos-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				iframe {
					margin-top: 10px;
				}
			}
		}
	}
</style>
