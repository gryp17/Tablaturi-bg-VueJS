<template>
	<footer class="footer">
		<router-link :to="{name: 'copyright'}">Авторско право</router-link>
		<a href="mailto:reklama@tablaturi-bg.com">За реклама</a>
		<router-link :to="{name: 'about-us'}">За нас</router-link>

		<div class="copyright">
			{{ currentYear }} Всички права запазени. &copy;
		</div>
	</footer>
</template>

<script>
	import moment from 'moment';

	export default {
		computed: {
			currentYear() {
				return moment().format('YYYY');
			}
		}
	};
</script>

<style scoped lang="scss">
	.footer {
		padding: 15px 50px;
		background-color: $red;

		a {
			margin-right: 30px;
		}

		.copyright {
			float: right;
			color: $white;
		}
	}
</style>
