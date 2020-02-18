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
			<div class="tab-pane fade show active" id="software" role="tabpanel" aria-labelledby="software-tab">
				<div class="usefull-item">
					<img src="/img/usefull/tuxguitar.png" />
					<div class="description">
						<h5>
							<a class="red" href="http://tuxguitar.herac.com.ar/download.html" target="_blank">TuxGuitar</a>
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
							<a class="red" href="http://www.aptuner.com/aptuner_index.html" target="_blank">APTuner</a>
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
			<div class="tab-pane fade" id="lessons" role="tabpanel" aria-labelledby="lessons-tab">
				<div class="usefull-item">
					<img src="/img/usefull/lessons.jpg" />
					<div class="description">
						TODO: figure out how to make the download links work!!!
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="video-lessons" role="tabpanel" aria-labelledby="video-lessons-tab">
				video lessons
			</div>
		</div>
	</div>
</template>

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

	}
</style>
