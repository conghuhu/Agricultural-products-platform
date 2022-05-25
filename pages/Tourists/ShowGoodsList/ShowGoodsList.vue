<template>
	<view class="fullScreen">
		<u-navbar title="商品列表" :is-back="true" :background="background">
			<view class="slot-wrap" @click="rightClick()">
			</view>
		</u-navbar>
		<view class="show_list">
			<view class="card" v-for="(item,index) in goodList" :key="item._id">
				<view class="list_left">
					<u-image height="100%" width="100%" mode="aspectFit" :src="item.imageShowList[0]"></u-image>
				</view>
				<view class="list_right">
					<view class="right_top">
						{{item.goodName}}
					</view>
					<view class="right_mid">
						{{item.description}}
					</view>
					<view class="right_bottom">
						<view class="bottom_left">
							{{item.goodPrice}}元/{{item.unit}}
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
	} from 'vue';
	import request from '@/api/request';

	export default {
		setup() {
			const background = ref({
				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(76,200,24), rgb(212,198,119))'
			});
			const goodList = reactive([]);
			async function rightClick() {
				await uni.navigateBack({})
			}
			return {
				background,
				goodList
			}
		},
		async onLoad(val) {
			const res = await request('goods', {
				type: 'getGoodsByScdCategoryId',
				secondCategoryId: val.id
			});
			this.goodList.length = 0;
			res.data.forEach(item => {
				this.goodList.push(item);
			});
			console.log(res);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		background-color: #F2F4F7;
		position: relative;
		font-size: 32rpx;

		.u-line {
			color: #87888a;
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
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.right_top {
						margin: 4rpx;
						margin-bottom: 20rpx;
						font-size: 36rpx;
						font-weight: 550;
						line-height: 1.25;
					}

					.right_mid {
						margin: 4rpx;
						font-weight: 500;
						font-size: 30rpx;
						line-height: 1.25;
					}

					.right_bottom {
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

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
