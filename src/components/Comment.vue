<template>
	<div class="comment">
		<img :src="`${CDN_URL}/avatars/${data.photo}`" class="user-avatar" />

		<div class="box-wrapper">
			<div class="box">
				<div class="author">
					{{ data.username }} каза:
				</div>
				<div class="date">{{ data.date }}</div>
				<!-- TODO: add emoticons here... -->
				<div class="content">{{ data.content }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		props: {
			data: Object
		},
		computed: {
			...mapState([
				'CDN_URL'
			])
		}
	};
</script>

<style scoped lang="scss">
	.comment {
		display: flex;
		margin-top: 15px;

		.user-avatar {
			width: 130px;
			height: 130px;
			border-radius: 100%;
		}

		.box-wrapper {
			flex: 1;

			.box {
				position: relative;
				margin-left: 10px;
				padding: 10px 15px;
				border-radius: 15px;
				background-color: $gray-lighter;

				&:before {
					position: absolute;
					left: -15px;
					top: 10px;
					content: '';
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 10px 20px 10px 0;
					border-color: transparent $gray-lighter transparent transparent;
				}

				.author {
					float: left;
				}

				.date {
					float: right;
					font-size: 13px;
					font-weight: 600;
				}

				.content {
					margin-top: 30px;
				}
			}
		}
	}
</style>
