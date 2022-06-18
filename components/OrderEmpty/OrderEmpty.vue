<template>
	<view>
		<view class="centre">
			<u-empty text="订单为空" mode="order"></u-empty>
			<view class="explain">
				<view class="tips">可以去看看有那些想买的</view>
			</view>
			<view class="btn" @click="gotoHome">随便逛逛</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		setup() {
			const gotoHome = () => {
				uni.switchTab({
					url: "/pages/Tourists/HomeBar/HomeBar"
				})
			};
			return {
				gotoHome
			}
		}
	}
</script>

<style lang="scss" scoped>
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		.tips {
			font-size: 30rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, #18b566 0%, #4CC818 100%);
		}
	}
</style>
