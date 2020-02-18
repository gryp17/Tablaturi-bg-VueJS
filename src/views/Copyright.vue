<template>
	<div class="copyright-page">
		<PageTitle>
			Авторско право
		</PageTitle>

		<img class="copyright-image" src="/img/copyright-logo.png" />

		<p class="notice">
			Всички таблатури, публикувани в сайта са за свободно ползване.
		</p>
		<p>
			В случай, че някоя от публикуваните в сайта таблатури подлежи на
			авторско право по Закона за авторско право и това е доказуемо, моля,
			<router-link :to="{name: 'contact-us'}" class="red">свържете се с нас</router-link>, за да предприемем съответните мерки.
			При изтриване на потребителски акаунт или получаване на бан от администраторите,
			публикуваните от потребителя таблатури не се изтриват от системата.
		</p>
	</div>
</template>

<style scoped lang="scss">
	.copyright-page {
		.copyright-image {
			display: block;
			margin: auto;
			margin-bottom: 25px;
		}

		.notice {
			margin-bottom: 5px;
			font-weight: bold;
		}
	}
</style>
