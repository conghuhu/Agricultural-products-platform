<template>
	<view :style="style">
		{{content}}
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	export default {
		props: {
			width: {
				type: Number,
				default: 100,
			},
			content: {
				type: String,
				default: ''
			}
		},
		setup(props) {
			const style = reactive({
				width: props.width + 'rpx',
				overflow: 'hidden',
				'white-space': 'nowrap',
				'text-overflow': 'ellipsis',
			});
			return {
				style
			}
		}
	}
</script>

<style>

</style>
