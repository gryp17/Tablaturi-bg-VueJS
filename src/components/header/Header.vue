<template>
	<header class="header">
		<MainMenu />

		<div class="inner-wrapper">
			<div class="aside left">
				<a href="http://www.facebook.com/tablaturiBG" target="_blank">
					<img src="/img/social/fb-icon.jpg" title="Последвайте ни във Facebook"/>
				</a>
			</div>

			<img alt="Tablaturi-bg Logo" title="Tablaturi-bg" src="/img/logo-tablaturi-bg.png"/>

			<div class="aside right">
				<!-- TODO: get the total tabs from the backend -->
				<div class="stats">
					<div>
						<strong>82288</strong> Guitar Pro таблатури
					</div>
					<div>
						<strong>196345</strong> Текстови таблатури
					</div>
				</div>

				<UserPanel />
			</div>
		</div>

	</header>
</template>

<script>
	import MainMenu from '@/components/header/MainMenu';
	import UserPanel from '@/components/header/UserPanel';

	export default {
		components: {
			MainMenu,
			UserPanel
		}
	};
</script>


<style scoped lang="scss">
	.header {
		background-color: $gray;

		.inner-wrapper {
			position: relative;
			display: flex;

			.aside {
				flex: 1;

				&.left {
					display: flex;
					flex-direction: column-reverse;
					padding: 10px;

					img {
						width: 35px;
					}
				}

				&.right {
					.stats {
						padding: 10px;
						text-align: right;
					}

					.user-panel {
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
	}
</style>
