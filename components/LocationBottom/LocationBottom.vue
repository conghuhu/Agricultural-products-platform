<template>
	<view class="location_group">
		<u-image height="40rpx" width="40rpx" mode="aspectFit" :src="imgUrl" />
		<view style="margin-left: 6rpx;">
			<Ellipsis :content="value" :width="width" />
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		props: {
			// 检测类型
			value: {
				type: String,
				default: "",
			},
			width: {
				type: Number,
				default: 200
			},
			imgUrl: {
				type: String,
				default: '/static/images/location_icon.png'
			}
		},
		setup() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.location_group {
		position: absolute;
		bottom: 16rpx;
		left: 10rpx;
		font-size: 30rpx;
		color: #fafafa;
		display: flex;
		align-items: center;
	}
</style>
