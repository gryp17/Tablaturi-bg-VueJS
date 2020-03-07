<template>
	<div class="article-box">
		<router-link :to="articleLink" :title="data.title">
			<div class="date">
				{{ date }}
			</div>
			<div class="image" :style="imageStyle"></div>
		</router-link>
		<div class="content">
			<h3>
				<router-link :to="articleLink" :title="data.title">
					{{ data.title }}
				</router-link>
			</h3>

			<div class="summary" v-html="content"></div>

			<router-link :to="articleLink">
				<FormButton>
					Прочети още
				</FormButton>
			</router-link>
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
			articleLink() {
				return {
					name: 'article',
					params: {
						id: this.data.ID
					}
				};
			},
			imageUrl() {
				return `${this.CDN_URL}/articles/${this.data.picture}`;
			},
			imageStyle() {
				return {
					'background-image': `url(${this.imageUrl})`
				};
			},
			date() {
				return moment(this.data.date).format('YYYY-MM-DD HH:mm');
			},
			content() {
				const sanitizedContent = this.data.content.replace(/<[^>]+>/gm, '');
				const limit = 210 - this.data.title.length;
				return this.$options.filters.limitTo(sanitizedContent, limit);
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-box {
		position: relative;
		overflow: hidden;
		color: $white;

		.date {
			position: absolute;
			width: 100%;
			top: 0;
			padding: 7px 10px;
			text-align: right;
			font-size: 12px;
			font-weight: 600;
			background-color: rgba($red, 0.7);
			z-index: 1;
		}

		.image {
			position: relative;
			height: 200px;
			width: 100%;
			background-size: cover;
			cursor: pointer;
			transition: all 1s;

			&:hover{
				transform: scale(1.3);
			}
		}

		.content {
			position: relative;
			min-height: 220px;
			padding: 10px;
			background-color: $blue;

			h3 {
				margin: 0;
				line-height: 17px;

				a {
					font-size: 15px;
					font-weight: 600;
					color: $white;
				}
			}

			.summary {
				margin-top: 15px;
			}

			.form-button {
				position: absolute;
				right: 10px;
				bottom: 10px;
			}
		}
	}
</style>
