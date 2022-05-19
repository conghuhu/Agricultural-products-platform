<template>
	<view class="fullScreen">
		<Nav title="我的信息"></Nav>
		<view class="head">
			<view class="info">
				<view class="info_image">
					<u-avatar size="120" src="https://cdn.uviewui.com/uview/common/classify/2/13.jpg"></u-avatar>
				</view>
				<view class="info_name">xiaowangtongxue</view>
			</view>
			<view class="message">
				<view class="message_left">
					<u-image width="100%" height="100%" src="./static/images/message.png"></u-image>
				</view>
				<view class="message_right">
					<u-image width="100%" height="100%" src="./static/images/setting.png"></u-image>
				</view>
			</view>
		</view>
		<view class="money">
			<view class="money_left">钱包</view>
			<view class="money_rigt">￥20.00</view>
		</view>
		<view class="order">
			<view class="order_top">
				<view class="top_left">我的订单</view>
				<view class="top_right">全部></view>
			</view>
			<view class="order_contain">
				<view class="contain_left">
					<view class="left_images">
						<u-image width="100%" height="100%" mode="heightFix" src="./static/images/pay.png"></u-image>
					</view>
					<view class="left_title">
						待支付
					</view>
				</view>
				<view class="contain_mid1">
					<view class="mid1_images">
						<u-image width="100%" height="100%" mode="heightFix" src="./static/images/goods.png"></u-image>
					</view>
					<view class="mid1_title">
						进行中
					</view>

				</view>
				<view class="contain_left">
					<view class="left_images">
						<u-image width="100%" height="100%" mode="heightFix" src="./static/images/evaluate.png">
						</u-image>
					</view>
					<view class="left_title">
						待评价
					</view>
				</view>
				<view class="contain_left">
					<view class="left_images">
						<u-image width="100%" height="100%" mode="heightFix" src="./static/images/refund.png"></u-image>
					</view>
					<view class="left_title">
						退款/售后
					</view>
				</view>
			</view>
		</view>
		<view class="setting">
			<view class="setting_contain">
				<view class="contain_images">
					<u-image width="100%" height="100%"  mode="widthFix" src="./static/images/store.png"></u-image>
				</view>
				<view class="contain_title">
					关注店铺
				</view>
			</view>
			<view class="setting_contain">
				<view class="contain_images">
					<u-image width="100%" height="100%" mode="widthFix" src="./static/images/address.png"></u-image>
				</view>
				<view class="contain_title">
					收集地址
				</view>
			</view>
			<view class="setting_contain">
				<view class="contain_images">
					<u-image width="100%" height="100%" mode="widthFix" src="./static/images/service.png"></u-image>
				</view>
				<view class="contain_title">
					官方客服
				</view>
			</view>
			<view class="setting_contain">
				<view class="contain_images">
					<u-image width="100%" height="100%" mode="widthFix" src="./static/images/footprint.png"></u-image>
				</view>
				<view class="contain_title">
					足迹
				</view>
			</view>
		</view>
		<view>
			<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	export default {
		setup() {
			const list = reactive(navList)
			const current = ref(0);
			return {
				list,
				current
			}
		}



	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		background-color: #e5e7e8;
		position: relative;

		.head {
			width: 100%;
			height: 10vh;
			background-color: #F2F4F7;
			display: flex;
			align-items: center;

			.info {
				flex: 7;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.info_image {
					flex: 1;
				}

				.info_name {
					flex: 2;
					display: flex;
					align-items: center;
					justify-content: left;
					font-size: 32rpx;
					font-weight: 600;
				}
			}

			.message {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.message_left {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;

				}

				.message_right {
					width: 50rpx;
					height: 50rpx;
					margin-right: 26rpx;
				}
			}
		}

		.money {
			height: 10vh;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			background-color: #F2F4F7;
			justify-content: space-around;
			border-radius: 10rpx;
			box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);

			.money_left {

				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: 600;
			}

			.money_rigt {
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: 600;
			}
		}

		.order {
			height: 14vh;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			background-color: #F2F4F7;
			flex-direction: column;
			border-radius: 10rpx;
			box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);

			.order_top {
				width: 100%;
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #F2F4F7;

				.top_left {
					margin-left: 20rpx;
					font-weight: 600;
				}

				.top_right {
					margin-right: 20rpx;
					font-size: 26rpx;
					font-weight: 200;
				}
			}

			.order_contain {
				width: 100%;
				flex: 7;
				display: flex;
				align-items: center;
				justify-content: center;

				.contain_left {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 8vh;
					flex: 1;

					.left_images {
						margin-top: 5rpx;
						flex: 1;
						margin-bottom: 5rpx;
					}

					.left_title {
						font-size: 26rpx;
						font-weight: 550;
						flex: 1;
					}
				}

				.contain_mid1 {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 8vh;
					flex: 1;

					.mid1_images {
						margin-top: 5rpx;
						flex: 1;
						margin-bottom: 5rpx;
					}

					.mid1_title {
						font-size: 26rpx;
						font-weight: 550;
						flex: 1;
					}
				}
			}
		}

		.setting {
			margin-top: 20rpx;
			width: 100%;
			height: 12vh;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F2F4F7;
			border-radius: 10rpx;
			box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);

			.setting_contain {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 8vh;
				flex: 1;
				.contain_images{
					width: 30%;
					margin-top: 5rpx;
					flex: 1;
					margin-bottom: 5rpx;
					
				}

				.contain_title {
					font-size: 26rpx;
					font-weight: 550;
					flex: 1;

				}
			}
		}

	}
</style>
