<template>
	<view>
		<view class="centre">
			<u-empty text="订单为空" mode="order"></u-empty>
			<view class="explain">
				<view class="tips">{{tips}}</view>
			</view>
			<view class="btn" @click="gotoHome">{{gotoText}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		props: {
			// 检测类型
			tips: {
				type: String,
				default: '可以去看看有那些想买的',
				required: false,
			},
			// 只能是tarbar界面
			page: {
				type: String,
				default: '/pages/Tourists/HomeBar/HomeBar',
				required: false
			},
			gotoText: {
				type: String,
				default: '随便逛逛',
				required: false
			},
			isTarbar: {
				type: Boolean,
				default: true,
				required: false
			}
		},
		setup(props) {
			const gotoHome = () => {
				if (props.isTarbar) {
					uni.switchTab({
						url: props.page
					})
				} else {
					uni.navigateTo({
						url: props.page
					})
				}
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
