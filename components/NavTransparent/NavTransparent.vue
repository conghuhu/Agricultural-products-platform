<template>
	<view class="icon" @click="goBack" :style="{ top: statusBarHeight + 'px' }">
		<u-image height="70rpx" width="70rpx" mode="aspectFill" src="/static/images/goBack.png" />
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	export default {
		setup() {
			const statusBarHeight = computed(() => {
				let systemInfo = uni.getSystemInfoSync();
				return systemInfo.statusBarHeight;
			})
			const goBack = () => {
				uni.navigateBack();
			}
			return {
				goBack,
				statusBarHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		position: fixed;
		left: 30rpx;
		z-index: 998;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
	}
</style>
