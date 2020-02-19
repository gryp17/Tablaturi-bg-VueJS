<template>
	<div class="guitar-pro-page">
		<PageTitle>
			Guitar Pro
		</PageTitle>

		<div class="intro">
			<img src="/img/GP6.png" />

			<p>
				<strong>Guitar Pro</strong> е професионална програма за свирене, разучаване и композиране
				на песни от 4 до 7 струнни музикални инструменти като китара, бас, банджо, мандолина и др.
				<br/><br/>
				Програмата предлага възможности за използване на таблатури и партитури,
				възможности за подобряване на уменията със забързване и забавяне на темпото,
				преслушване на песни, записване на изсвирвания с използване на дигитални ефекти,
				преглед в диаграма на записите, намиране на таблатури в интернет и още много други.
				Поддържа и технологията <a class="red" href="http://www.guitar-pro.com/en/index.php?pg=soundbanks" target="_blank">RSE</a>
				за по-добър и "жив" звук.
			</p>
		</div>

		<div id="guitar-pro-carousel" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="/img/carousel/1.png" />
				</div>
				<div class="carousel-item">
					<img src="/img/carousel/2.png" />
				</div>
				<div class="carousel-item">
					<img src="/img/carousel/3.jpg" />
				</div>
				<div class="carousel-item">
					<img src="/img/carousel/4.jpg" />
				</div>
			</div>
			<a class="carousel-control-prev" href="#guitar-pro-carousel" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#guitar-pro-carousel" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

		<p>
			Огромната лекота при използването ѝ и успехът на нейния специализиран
			формат са я направили широко използваема от световноизвестни китаристи.
			В момента програмата поддръжа голяма гама от музикални инструменти
			като пиано и барабани, реалистичен аудио енджин и интерактивни инструменти.
			<br/><br/>
			<strong>
				Посетете официалната страница на <a class="red" href="https://www.guitar-pro.com" target="_blank">Guitar Pro</a>,
				където можете да закупите програмата или да свалите trial версия.
			</strong>
		</p>
	</div>
</template>

<style scoped lang="scss">
	.guitar-pro-page {
		.intro {
			img {
				float: left;
				width: 300px;
			}

			p {
				padding-top: 20px;
			}
		}

		.carousel {
			margin: 40px 0px;

			.carousel-item {
				img {
					width: 100%;
					height: 469px;
				}
			}

			.carousel-control-prev-icon, .carousel-control-next-icon {
				width: 50px;
				height: 40px;
			}
		}
	}
</style>
