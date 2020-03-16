<template>
	<table class="results-table table table-striped">
		<slot></slot>
	</table>
</template>

<style scoped lang="scss">
	.results-table {
		thead {
			td {
				border-top: none;
				font-weight: 600;
			}
		}

		td {
			vertical-align: middle;
		}

		a.red {
			text-decoration: none;

			&:hover, &:focus, &:active:focus {
				text-decoration: underline;
			}
		}
	}
</style>
