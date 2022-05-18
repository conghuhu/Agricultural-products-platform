<template>
	<view class="fullScreen">
		<u-navbar title="商品列表" :is-back="true" :background="background">
			<view class="slot-wrap" @click="rightClick()">
			</view>
		</u-navbar>
		<view class="show_list">
			<view class="card">
				<view class="list_left">
					<u-image height="100%" width="100%" mode="aspectFit"
						src="https://cdn.uviewui.com/uview/common/classify/2/13.jpg"></u-image>
				</view>
				<view class="list_right">
					<view class="right_top">
						油菜350g
					</view>
					<view class="right_mid">
						清脆鲜嫩|口感柔嫩|餐桌必备
					</view>
					<view class="right_bottom">
						<view class="bottom_left">
							￥1
						</view>
						<view class="bottom_right">
							<u-image height="100%" width="100%" mode="aspectFit"
								src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/%E5%8A%A0%E5%8F%B7.png?sign=d51880931e044fe85c79ff3e20ee31b7&t=1652775486">
							</u-image>
						</view>
					</view>
				</view>
			</view>
			
			<u-line color="#55ff00" class="u-line"></u-line>

		</view>
	</view>

</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'

	export default {
		setup() {
			const background = ref({
				backgroundColor: 'linear-gradient(45deg, rgb(76,200,24), rgb(212,198,119))',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(76,200,24), rgb(212,198,119))'
			})
			async function rightClick() {
				await uni.navigateBack({})
			}
			return {
				background
			}
		},
		onLoad(val) {
			console.log(val)
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		background-color: #F2F4F7;
		position: relative;
		.u-line{
			color: #55ff00;
			width: 100%;
		}

		.show_list {
			width: 100%;
			padding: 10rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.card {
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 5rpx;
				height: 20vh;
				background-color: #F2F4F7;
				width: 100%;

				.list_left {
					height: 25vw;
					padding: 2rpx;
					flex: 1;
				}

				.list_right {
					flex: 2;
					height: 25vw;

					.right_top {
						margin: 4rpx;
						height: 8vw;
						font-size: 32rpx;
						font-weight: 600;
					}

					.right_mid {
						margin: 4rpx;
						height: 8vw;
						font-weight: 300;
					}

					.right_bottom {
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 8vw;

						.bottom_left {
							margin: 2rpx;
							flex: 1;
							font-size: 30rpx;
							font-weight: 550;
							color: #ff0000;
						}

						.bottom_right {
							margin: 2rpx;
							height: 7vw;
							flex: 1;
						}
					}
				}
			}

		}
	}
</style>
