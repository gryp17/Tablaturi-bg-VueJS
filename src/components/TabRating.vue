<template>
	<div class="tab-rating" :title="ratingLabel">
		<label v-if="label">
			{{ label }}
		</label>

		<div class="stars-wrapper">
			<div
				v-for="(star, index) in stars"
				:key="index"
				:class="['star', {empty: star === 0}]"
				@mouseover="highlightStar(index)"
				@click="selectStar(index)"
			></div>
		</div>

		<div v-if="editable" class="rating-label">
			{{ ratingLabel }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			rating: Number,
			editable: Boolean,
			label: String
		},
		data() {
			return {
				stars: [0, 0, 0, 0, 0],
				labels: [
					'Зле',
					'Слабо',
					'Бива',
					'Доста добре',
					'Супер!'
				],
				ratingLabel: null
			};
		},
		created() {
			this.initialize();
		},
		methods: {
			/**
			 * Updates the full and empty stars
			 * @param {Number} rating
			 */
			updateStars(rating) {
				this.stars = this.stars.map((star, index) => {
					if (index < rating) {
						return 1;
					}

					return 0;
				});

				this.ratingLabel = rating > 0 ? this.labels[rating - 1] : null;
			},
			/**
			 * Calculates the rating and updates the stars
			 */
			initialize() {
				const rating = Math.round(this.rating);
				this.updateStars(rating);
			},
			/**
			 * Highlights all stars up to the selected star
			 * @param {Number} index
			 */
			highlightStar(index) {
				if (!this.editable) {
					return;
				}

				this.updateStars(index + 1);
			},
			/**
			 * Emits the "rate" event with the selected star/rating
			 * @param {Number} index
			 */
			selectStar(index) {
				if (!this.editable) {
					return;
				}

				this.$emit('rate', index + 1);
			}
		}
	};
</script>

<style scoped lang="scss">
	.tab-rating {

		label {
			display: block;
			text-align: center;
		}

		.stars-wrapper {
			display: flex;
			justify-content: center;;

			.star {
				margin-bottom: 2px;
				margin-right: 1px;
				height: 15px;
				width: 15px;
				background-size: 15px 15px;
				background-image: url(/img/icons/star.png);

				&.empty {
					background-image: url(/img/icons/star-empty.png);
				}
			}
		}

		.rating-label {
			text-align: center;
		}
	}
</style>
