<template>
	<view class="fullScreen">
		<Nav title="提交订单" isBack />
		<view class="content">
			<view class="card">
				<view class="container" @click="gotoLocation">
					<view class="location_left">
						<view class="locationVal">
							{{curLocationVal.location}}
						</view>
						<view class="peopleInfo">
							<text style="margin-right: 16rpx;">
								{{curLocationVal.consignee}}
							</text>
							<text style="margin-right: 16rpx;">
								{{curLocationVal.sex}}
							</text>
							<text>
								{{curLocationVal.phone}}
							</text>
						</view>
					</view>
					<view class="location_right">
						<u-image style="display: flex; justify-content: center;align-items: center;" height="30rpx"
							width="30rpx" mode="aspectFill"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=f45c0a34dce9a7e4eea366634636230e&t=1654052336">
						</u-image>
					</view>
				</view>
			</view>

			<view class="card">
				<view class="remark">
					<text style="font-weight: 550;">支付方式</text>
					<view style="display: flex;align-items: center;">
						<text style="color: #696969;margin-right: 10rpx;">微信支付</text>
						<u-image style="display: flex; justify-content: center;align-items: center;" height="30rpx"
							width="30rpx" mode="aspectFill"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=f45c0a34dce9a7e4eea366634636230e&t=1654052336">
						</u-image>
					</view>
				</view>
			</view>

			<view class="card">
				<view class="shop_container">
					<view class="top">
						<text style="font-weight: 550;">送达时间</text>

						<text>预计13:09送达</text>
					</view>

					<view class="good_content">
						<view class="goodCard" v-for="(item, index) in wantList" :key="item._id">
							<view class="good_content">
								<view class="list_left">
									<u-image height="25vw" width="25vw" mode="aspectFit"
										:src="item.goodInfo[0].imageShowList[0]">
									</u-image>
								</view>
								<view class="list_right">
									<view class="right_top">
										<Ellipsis :content="item.goodInfo[0].goodName" :width="380" />
									</view>
									<view class="right_mid">
										<Ellipsis :content="item.goodInfo[0].description" :width="400" />
									</view>
									<view class="right_bottom">
										<view class="bottom_left">
											{{item.goodInfo[0].goodPrice}}元/{{item.goodInfo[0].unit}}
										</view>
										<view class="bottom_right">
											数量：{{item.count}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="card">
				<view class="remark" @click="gotoRemark">
					<text style="font-weight: 550;">订单备注</text>
					<view style="display: flex;align-items: center;">
						<Ellipsis style="color: #696969;margin-right: 10rpx;" :width="400" :content="remarkVal">
						</Ellipsis>
						<u-image style="display: flex; justify-content: center;align-items: center;" height="30rpx"
							width="30rpx" mode="aspectFill"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=f45c0a34dce9a7e4eea366634636230e&t=1654052336">
						</u-image>
					</view>
				</view>
			</view>

			<view class="action_bottom">
				<view class="left">
				</view>
				<view class="right">
					<view class="price">
						<view>
							待支付:
						</view>
						<view style="color: #ff0000;">
							￥{{totalPrice}}
						</view>
					</view>
					<u-button @click="gotoSubmitOrder" style="width: 180rpx;margin-right: 10rpx;margin-left: 30rpx;"
						type="primary">立即支付
					</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue';
	import request from '@/api/request';
	import {
		commonStore
	} from '@/stores/store';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	export default {
		setup() {
			const user = userStore();
			const store = commonStore();
			const {
				curSubmitOrderList
			} = storeToRefs(store);

			const totalPrice = computed(() => {
				let total: number = 0;
				wantList.forEach(item => {
					if (item.checked) {
						total += Number.parseFloat(item.goodInfo[0].goodPrice) * Number.parseInt(item
							.count);
					}
				});
				return total;
			});

			const remarkVal = ref("");

			const curLocationVal = reactive({
				adress: "",
				consignee: "",
				house: "",
				location: "请选择收货地址",
				locationArr: {
					type: "",
					coordinates: []
				},
				phone: "",
				sex: "",
				_id: "",
				_openid: ""
			});

			const wantList = reactive([]);

			const gotoLocation = () => {
				uni.navigateTo({
					url: '/pages/Tourists/Location/Location'
				})
			};

			const gotoRemark = () => {
				uni.navigateTo({
					url: `/pages/Tourists/Remark/Remark?remarkVal=${remarkVal.value}`,
					events: {
						changeRemarkVal: function(data) {
							remarkVal.value = data;
						}
					}
				})
			};

			/**
			 * 初始化位置
			 */
			const initLocation = async () => {
				if (user.curLocationId != "") {
					const res = await request('touristInfo', {
						type: 'getAddressById',
						addressId: user.curLocationId
					});
					Object.assign(curLocationVal, res.data);
				}
			};

			const initGoodList = async () => {
				if (store.curSubmitOrderList.length != 0) {
					wantList.length = 0;
					store.curSubmitOrderList.forEach(item => {
						wantList.push(item);
					});
				}
			}

			/**
			 * 
			 */
			const gotoSubmitOrder = async () => {
				if (curLocationVal._id == "") {
					await uni.showToast({
						title: '请选择收货地址',
						icon: 'error'
					});
					return;
				}
				uni.showLoading({
					title: "去支付"
				})
				console.log(wantList);
				const res = await request('order', {
					type: 'createOrder',
					curLocationId: curLocationVal._id,
					remarkVal: remarkVal.value,
					goodList: wantList.map(item => {
						return {
							...item.goodInfo[0],
							count: item.count
						}
					}),
					wantList: wantList.map(item => item._id),
					price: totalPrice.value
				});
				user.removeWantedGood(wantList.map(item => item.goodId));
				uni.hideLoading();

				uni.showModal({
					title: '微信支付',
					content: `确认支付 ${totalPrice.value} 元`,
					success: async function(e) {
						if (e.confirm) {
							uni.showLoading({
								title: "支付中"
							})
							const temp = await request('order', {
								type: 'payOrder',
								orderId: res.data
							});
							uni.hideLoading();
							uni.showToast({
								title: "支付成功",
								duration: 1500,
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/Tourists/HomeBar/HomeBar'
								})
							}, 1500);
						} else if (e.cancel) {
							uni.navigateBack();
						}
					}
				})

				// console.log(res)
			}

			onMounted(async () => {

			});
			return {
				curSubmitOrderList,
				curLocationVal,
				gotoLocation,
				initLocation,
				initGoodList,
				wantList,
				totalPrice,
				remarkVal,
				gotoRemark,
				gotoSubmitOrder
			}
		},
		async onShow() {
			this.initLocation();
			this.initGoodList();
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: $background-color;
			padding: 20rpx;
			padding-bottom: 150rpx;

			.card {
				background-color: #fff;
				padding: 30rpx 20rpx 30rpx 20rpx;
				border-radius: 20rpx;
				margin-bottom: 24rpx;

				.remark {
					display: flex;
					justify-content: space-between;
				}

				.shop_container {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;

					.top {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;


					}

					.good_content {
						width: 100%;

						.goodCard {
							padding: 16rpx 16rpx 16rpx 16rpx;
							background-color: #ffffff;
							width: 100%;
							margin-bottom: 20rpx;
							border-radius: 20rpx;

							.good_content {
								padding-left: 10rpx;
								display: flex;
								align-items: center;
								justify-content: space-around;

								.list_left {
									display: flex;
									justify-content: center;
									align-items: center;
								}

								.list_right {
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									padding-left: 20rpx;
									min-width: 400rpx;

									.right_top {
										margin: 4rpx;
										margin-bottom: 20rpx;
										font-weight: 550;
										line-height: 1.25;
									}

									.right_mid {
										margin: 4rpx;
										font-weight: 500;
										font-size: 28rpx;
										line-height: 1.25;
										color: $u-type-info-dark;
									}

									.right_bottom {
										margin-top: 10rpx;
										margin-bottom: 10rpx;
										display: flex;
										align-items: center;
										justify-content: space-between;

										.bottom_left {
											margin: 2rpx;
											font-size: 30rpx;
											font-weight: 550;
											color: #ff0000;
										}

										.bottom_right {}
									}
								}
							}
						}
					}
				}


				.container {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.location_left {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;

						.locationVal {
							font-weight: 550;
							font-size: 36rpx;
							margin-bottom: 16rpx;
						}

						.peopleInfo {
							display: flex;
							align-items: center;
							font-size: 30rpx;
							color: $u-type-info-dark;
						}
					}
				}
			}
		}

		.action_bottom {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 16rpx;
			align-items: center;
			position: fixed;
			background-color: white;
			bottom: 0;
			z-index: 600;
			padding-right: 40rpx;

			.right {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.price {
					// width: 180rpx;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
