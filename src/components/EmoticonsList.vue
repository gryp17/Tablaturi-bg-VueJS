<template>
	<div class="emoticons-list">
		<img
			v-for="emoticon in emoticons"
			@click="onEmoticonSelected(emoticon.title)"
			:key="emoticon.title"
			:title="emoticon.title"
			:src="`/img/emoticons/${emoticon.img}`"
			class="clickable-emoticon"
		/>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState({
				emoticons: 'EMOTICONS_LIST'
			})
		},
		methods: {
			/**
			 * Triggered when an emoticon is clicked
			 * @param {String} title
			 */
			onEmoticonSelected(title) {
				this.$emit('emoticon-selected', title);
			}
		}
	};
</script>

<style scoped lang="scss">
	.emoticons-list {
		.clickable-emoticon {
			display: inline-block;
			width: 25px;
			height: 25px;
			margin: 3px;
			cursor: pointer;
		}
	}
</style>
