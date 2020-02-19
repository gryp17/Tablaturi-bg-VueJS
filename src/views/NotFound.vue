<template>
	<div class="not-found-page">
		<div class="inner-wrapper">
			<img src="/img/guitar-cat.png" />
			<div class="text">
				<h1>404</h1>
				<p>
					Упс! Търсената страница не може да бъде намерена.
				</p>
				<router-link :to="{name: 'home'}" class="red">
					Върни ме в началото
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.not-found-page {
		.inner-wrapper {
			display: flex;
			padding: 60px;

			.text {
				padding: 85px 15px;
				text-align: center;

				h1 {
					font-size: 70px;
					font-weight: 200;
				}
			}
		}
	}
</style>
