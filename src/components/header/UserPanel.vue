<template>
	<div class="user-panel">
		<!-- TODO: if user is logged in show the logout button -->
		<a class="signup-link" href="#">Регистрация</a>
		<FormButton>
			Вход
		</FormButton>
	</div>
</template>

<style scoped lang="scss">
	.user-panel {
		padding: 10px;
		text-align: right;

		.signup-link {
			margin-right: 10px;
			text-decoration: underline;
			font-size: 16px;
			color: $text-color;
		}
	}
</style>
