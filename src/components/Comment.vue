<template>
	<div class="comment">
		<img :src="userAvatar" class="user-avatar" />

		<div class="box-wrapper">
			<div class="box">
				<div class="author">
					<router-link
						:to="{name: 'profile', params: {id: data.author_ID}}"
						:title="`Виж профила на ${data.username}`"
						class="red"
					>{{ data.username }}</router-link>
					каза:
				</div>
				<div class="date">{{ date }}</div>
				<div class="content" v-html="content"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import { mapState } from 'vuex';

	export default {
		props: {
			data: Object
		},
		computed: {
			...mapState([
				'CDN_URL'
			]),
			userAvatar() {
				return `${this.CDN_URL}/avatars/${this.data.photo}`;
			},
			content() {
				return this.$options.filters.emoticons(this.data.content);
			},
			date() {
				return moment(this.data.date).format('YYYY-MM-DD в HH:mm:ss');
			}
		}
	};
</script>

<style lang="scss">
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

					.emoticon {
						width: 25px;
						height: 25px;
					}
				}
			}
		}
	}
</style>
