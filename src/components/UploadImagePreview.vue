<template>
	<div class="upload-image-preview">
		<img :src="image" class="image" />

		<div class="overlay">
			<i class="fas fa-camera"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			image: String
		}
	};
</script>

<style scoped lang="scss">
	.upload-image-preview {
		$size: 200px;

		position: relative;
		border-radius: 100%;
		overflow: hidden;
		cursor: pointer;

		&:hover {
			.overlay {
				height: $size;
				padding-top: 90px;
			}
		}

		.image {
			width: $size;
			height: $size;
			border-radius: 0px;
			margin-top: 0;
		}

		.overlay {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
			height: 50px;
			padding-top: 10px;
			text-align: center;
			background-color: rgba(101, 92, 92, 0.5);
			transition: all 200ms ease-in;

			.fa-camera {
				font-size: 30px;
				color: $white;
			}
		}
	}
</style>
