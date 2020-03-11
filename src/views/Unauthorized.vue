<template>
	<div class="unauthorized-page">
		<img src="/img/locked.png" />
		<h5>
			Страница с ограничен достъп
		</h5>
		<p>
			Не разполагаш с нужните права, за да достъпиш страницата.
			<br />
			При проблем можеш да се
			<router-link :to="{name: 'contact-us'}" class="red">свържеш с нас</router-link>.
		</p>
	</div>
</template>

<style scoped lang="scss">
	.unauthorized-page {
		text-align: center;

		img {
			width: 180px;
			margin: 15px auto;
		}
	}
</style>
