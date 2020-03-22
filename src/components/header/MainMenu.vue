<template>
	<nav class="main-menu">
		<router-link :to="{name: 'home'}">
			Начало
		</router-link>
		<router-link :to="{name: 'articles'}">
			Новини
		</router-link>
		<router-link :to="{name: 'tabs'}">
			Таблатури
		</router-link>
		<router-link :to="{name: 'add-tab'}">
			Качи таблатура
		</router-link>
		<router-link :to="{name: 'guitar-pro'}">
			Guitar Pro
		</router-link>
		<router-link :to="{name: 'usefull'}">
			Полезно
		</router-link>
		<router-link :to="{name: 'contact-us'}">
			Контакти
		</router-link>
	</nav>
</template>

<style scoped lang="scss">
	.main-menu {
		display: flex;
		line-height: 50px;
		padding: 0px 10px;
		background-color: $red;

		a {
			position: relative;
			flex: 1;
			text-align: center;

			&:hover, &:active, &:focus {
				text-decoration: none;
			}

			&:before, &:after {
				position: absolute;
				left: 0;
				width: 100%;
				height: 1px;
				background: $white;
				content: '';
				opacity: 0;
				transition: opacity 0.3s, transform 0.3s;
				transform: translateY(-10px);
			}

			&:before {
				top: 7px;
				transform: translateY(-10px);
			}

			&:after {
				bottom: 7px;
				transform: translateY(10px);
			}

			&:focus:before{
				transform: translateY(-10px);
			}

			&:focus:after{
				transform: translateY(10px);
			}

			&:hover:before, &:hover:after {
				opacity: 1;
				transform: translateY(0px);
			}
		}
	}
</style>
