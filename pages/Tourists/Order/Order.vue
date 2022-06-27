<template>
	<view class="fullScreen">
		<Nav title="订单" :isBack="true" />
		<view class="wrap">
			<view v-if="loading">
				<MyLoading />
			</view>

			<block v-else>
				<view class="u-tabs-box">
					<u-tabs-swiper activeColor="#4CC818" ref="tabs" :list="list" :current="current" @change="change"
						:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				</view>


				<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
					@animationfinish="animationfinish">
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<OrderEmpty v-if="orderList[0].length == 0" />
								<view v-else class="order" v-for="(res, index) in orderList[0]" :key="res._id">
									<view class="top">
										<view class="left">
											<view class="store">{{ dayjs(res.createTime).format('YYYY-MM-DD HH:mm') }}
											</view>
										</view>
										<view class="right">待支付</view>
									</view>
									<view class="item" v-for="(item, index) in res.goodList" :key="item._id">
										<view class="left">
											<image :src="item.imageShowList[0]" mode="aspectFill"></image>
										</view>
										<view class="content">
											<view class="title u-line-2">
												<Ellipsis :content="item.goodName" :width="270" />
											</view>
											<view class="type">
												<Ellipsis :content="item.description" :width="270" />
											</view>
											<view class="delivery-time">
												<view style="margin-right: 10rpx;">
													产地
												</view>
												<Ellipsis :content="item.originPlace" :width="270" />
											</view>
										</view>
										<view class="right">
											<view class="price">
												￥{{ priceInt(item.goodPrice) }}
												<text class="decimal">.{{ priceDecimal(item.goodPrice) }}</text>
											</view>
											<view class="number">x{{ item.count }}</view>
										</view>
									</view>
									<view class="total">
										共{{ totalNum(res.goodList) }}件商品 合计:
										<text class="total-price">
											￥{{ priceInt(totalPrice(res.goodList)) }}.
											<text class="decimal">{{ priceDecimal(totalPrice(res.goodList)) }}</text>
										</text>
									</view>
									<view class="bottom">
										<view class="more">
											<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
										</view>
										<view class="bottom_right">
											<view class="cancel btn" @click="cancelOrder(res)">取消订单</view>
											<view class="pay btn" @click="payOrder(res)">立即支付</view>
										</view>
									</view>
								</view>
								<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
							</view>
						</scroll-view>
					</swiper-item>

					<!-- 待收货 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<OrderEmpty v-if="waitForGoodList.length == 0" />
								<view v-else class="order" v-for="(item, index) in waitForGoodList" :key="item._id"
									@click="gotoGoodDetail(item)">
									<view class="top">
										<view>

										</view>
										<view class="right">{{item.send ? '运送中':'待发货'}}</view>
									</view>

									<view class="item">
										<view class="left">
											<image :src="item.imageShowList[0]" mode="aspectFill"></image>
										</view>
										<view class="content">
											<view class="title u-line-2">
												<Ellipsis :content="item.goodName" :width="270" />
											</view>
											<view class="type">
												<Ellipsis :content="item.description" :width="270" />
											</view>
											<view class="delivery-time">
												<view style="margin-right: 10rpx;">
													产地
												</view>
												<Ellipsis :content="item.originPlace" :width="270" />
											</view>
										</view>
										<view class="right">
											<view class="price">
												￥{{ priceInt(item.goodPrice) }}
												<text class="decimal">.{{ priceDecimal(item.goodPrice) }}</text>
											</view>
											<view class="number">x{{ item.count }}</view>
										</view>
									</view>

									<view class="bottom">
										<view class="more">
											<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
										</view>
										<view class="bottom_right">
											<view class="cancel btn">查看物流</view>
											<view class="pay btn" @click.stop="confirmDeliveryGood(item)">确认收货</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<!-- 待评价 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;">
							<view class="page-box">
								<OrderEmpty v-if="waitEvaluateGoodList.length == 0" />
								<view v-else class="order" v-for="(item, index) in waitEvaluateGoodList" :key="item._id"
									@click="gotoGoodDetail(item)">
									<view class="top">
										<view>

										</view>
										<view class="right">待评价</view>
									</view>

									<view class="item">
										<view class="left">
											<image :src="item.imageShowList[0]" mode="aspectFill"></image>
										</view>
										<view class="content">
											<view class="title u-line-2">
												<Ellipsis :content="item.goodName" :width="270" />
											</view>
											<view class="type">
												<Ellipsis :content="item.description" :width="270" />
											</view>
											<view class="delivery-time">
												<view style="margin-right: 10rpx;">
													产地
												</view>
												<Ellipsis :content="item.originPlace" :width="270" />
											</view>
										</view>
										<view class="right">
											<view class="price">
												￥{{ priceInt(item.goodPrice) }}
												<text class="decimal">.{{ priceDecimal(item.goodPrice) }}</text>
											</view>
											<view class="number">x{{ item.count }}</view>
										</view>
									</view>

									<view class="bottom">
										<view class="more">
											<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
										</view>
										<view class="bottom_right">
											<view class="cancel btn" @click.stop="applyRefund(item)">申请退款</view>
											<view class="pay btn" @click.stop="toComments(item)">去评论</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>

					<!-- 已完成 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<OrderEmpty v-if="refundGoodList.length == 0" />
								<view v-else class="order" v-for="(item, index) in refundGoodList" :key="item._id"
									@click="gotoGoodDetail(item)">
									<view class="top">
										<view>

										</view>
										<view class="right">退款中</view>
									</view>

									<view class="item">
										<view class="left">
											<image :src="item.imageShowList[0]" mode="aspectFill"></image>
										</view>
										<view class="content">
											<view class="title u-line-2">
												<Ellipsis :content="item.goodName" :width="270" />
											</view>
											<view class="type">
												<Ellipsis :content="item.description" :width="270" />
											</view>
											<view class="delivery-time">
												<view style="margin-right: 10rpx;">
													产地
												</view>
												<Ellipsis :content="item.originPlace" :width="270" />
											</view>
										</view>
										<view class="right">
											<view class="price">
												￥{{ priceInt(item.goodPrice) }}
												<text class="decimal">.{{ priceDecimal(item.goodPrice) }}</text>
											</view>
											<view class="number">x{{ item.count }}</view>
										</view>
									</view>

									<view class="bottom">
										<view class="more">
											<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
										</view>
										<view class="bottom_right">
											<view class="cancel btn">查看详情</view>
											<view class="pay btn">售后评价</view>
										</view>
									</view>
								</view>
								<!-- <u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore> -->
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>

			</block>


		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	import request from '@/api/request';
	import dayjs from 'dayjs';
	import {
		userStore
	} from '@/stores/user';
	export default {
		setup() {
			const user = userStore();
			const loading = ref(true);

			const orderList = reactive([
				[],
				[],
				[],
				[]
			]);
			const list = reactive([{
					name: '待付款',
					count: 0
				},
				{
					name: '待收货',
					count: 0
				},
				{
					name: '待评价',
					count: 0
				},
				{
					name: '退款/售后',
					count: 0
				}
			]);
			const current = ref(0);
			const swiperCurrent = ref(0);
			const tabsHeight = ref(0);
			const dx = ref(0);
			const loadStatus = reactive(['loadmore', 'loadmore', 'loadmore', 'loadmore']);
			const tabs = ref(null);

			// 价格小数
			const priceDecimal = computed(() => {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				}
			});
			const priceInt = computed(() => {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			})

			const reachBottom = () => {
				// 此tab为空数据
				// if (current.value != 2) {
				// 	loadStatus.splice(current.value, 1, "loading")
				// 	setTimeout(() => {
				// 		getOrderList(current.value);
				// 	}, 1200);
				// }
			};

			// 获取某页面数据
			const getOrderList = (idx) => {
				// dataList.forEach(item => {
				// 	orderList[idx].push(item);
				// })
				// loadStatus.splice(current.value, 1, "loadmore")
			};

			// 总价
			const totalPrice = (item) => {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.goodPrice) * parseFloat(val.count);
				});
				return price.toFixed(2);
			};
			// 总件数
			const totalNum = (item) => {
				let num = 0;
				item.map(val => {
					num += val.count;
				});
				return num;
			};
			// tab栏切换
			const change = (index) => {
				swiperCurrent.value = index;
				// getOrderList(index);
			};

			const initDx = ref(false);

			const transition = ({
				detail: {
					dx
				}
			}) => {
				if (!initDx.value) {
					const val = dx - 375 * current.value;
					tabs.value.setDx(val);
				} else {
					tabs.value.setDx(dx);
				}
			};

			const animationfinish = (e) => {
				const detail = e.detail;
				if (!initDx.value) {
					initDx.value = true;
				}
				tabs.value.setFinishCurrent(detail.current);
				swiperCurrent.value = detail.current;
				current.value = detail.current;
			}

			/**
			 * 取消订单
			 */
			const cancelOrder = async (item) => {
				await request('order', {
					type: 'cancelOrder',
					orderId: item._id
				});
				initData(0);
			}

			/**
			 * 支付订单
			 */
			const payOrder = async (item) => {
				uni.showModal({
					title: '微信支付',
					content: `确认支付 ${item.price} 元`,
					success: async function(e) {
						if (e.confirm) {
							uni.showLoading({
								title: "支付中"
							})
							const temp = await request('order', {
								type: 'payOrder',
								orderId: item._id
							});
							console.log(temp);
							if (!temp.success) {
								uni.hideLoading();
								uni.showToast({
									title: "支付失败",
									duration: 1500,
								});
								return;
							}

							uni.hideLoading();
							uni.showToast({
								title: "支付成功",
								duration: 1500,
							})
							initData(0);
						} else if (e.cancel) {
							uni.navigateBack();
						}
					}
				})
			}

			/**
			 * 确认收货
			 */
			const confirmDeliveryGood = async (goodInfo) => {
				console.log(goodInfo);
				uni.showLoading({
					title: '确认中'
				})
				const res = await request('order', {
					type: 'confirmDeliveryGood',
					goodId: goodInfo._id,
					orderId: goodInfo.orderId
				})
				uni.hideLoading();
				console.log(res);
				initData(2);
			}

			/**
			 * 待收货货物列表
			 */
			const waitForGoodList = reactive([]);
			/**
			 * 待评价的货物列表
			 */
			const waitEvaluateGoodList = reactive([]);
			/**
			 * 退款中的货物列表
			 */
			const refundGoodList = reactive([]);

			/**
			 * 初始化数据
			 */
			const initData = async (index) => {
				loading.value = true;
				for (let i = 0; i < 4; i++) {
					orderList[i].length = 0;
				}
				refreshOrderStatus();

				// index 1：待支付  2：已付款，但未收到货  3：已收到货，待评价 4：彻底完成
				const resArr = await Promise.all([request("order", {
					type: 'queryUnpaidOrders'
				}), request("order", {
					type: 'queryIngGoods'
				}), request("order", {
					type: 'queryEvaluateGoods'
				}), request("order", {
					type: 'queryRefundGood'
				})]);
				console.log(resArr);

				waitForGoodList.length = 0;
				waitEvaluateGoodList.length = 0;
				refundGoodList.length = 0;
				// 向四个页面的数组赋值
				for (let i = 0; i < 4; i++) {
					const dataList = resArr[i].data;
					list[i].count = dataList.length;
					if (i == 0) {
						dataList.forEach(item => {
							orderList[i].push(item);
						})
					} else if (i == 1) {
						// 待收货
						dataList.forEach(item => {
							waitForGoodList.push({
								...item,
							});
						})
					} else if (i == 2) {
						// 待评价
						dataList.forEach(item => {
							waitEvaluateGoodList.push({
								...item,
							});
						})
					} else if (i == 3) {
						dataList.forEach(item => {
							refundGoodList.push({
								...item,
							});
						})
					}
				}

				current.value = index;
				change(index);
				loading.value = false;
			};

			/**
			 * 刷新order状态
			 */
			const refreshOrderStatus = async () => {
				const res = await request('order', {
					type: 'queryOrderStatus'
				});
				user.setOrderMap(res.data, 1);
			}
			//跳转评论结论
			const toComments = (data) => {
				console.log(data)
				uni.navigateTo({
					url: `../Comments/Comments?id=${data._id}&orderId=${data.orderId}`,
					events: {
						refresh: function(data) {
							initData(2);
						}
					}
				});
			}


			/**
			 * 申请退款
			 */
			const applyRefund = async (goodInfo) => {
				console.log(goodInfo);
				uni.showLoading({
					title: '发送申请'
				})
				const res = await request('order', {
					type: 'applyRefund',
					goodId: goodInfo._id,
					orderId: goodInfo.orderId
				});
				uni.hideLoading();
				uni.showToast({
					title: '申请成功'
				})
				console.log(res)
				initData(3);
			}
			/**
			 * 跳至商品详情页
			 */
			const gotoGoodDetail = (goodinfo) => {
				console.log(goodinfo);
				uni.navigateTo({
					url: `/pages/Tourists/GoodDetail/GoodDetail?goodId=${goodinfo._id}`
				})
			}

			return {
				orderList,
				list,
				current,
				swiperCurrent,
				tabsHeight,
				dx,
				loadStatus,
				priceDecimal,
				priceInt,
				reachBottom,
				getOrderList,
				totalPrice,
				totalNum,
				change,
				transition,
				animationfinish,
				tabs,
				dayjs,
				loading,
				cancelOrder,
				payOrder,
				initData,
				confirmDeliveryGood,
				waitForGoodList,
				waitEvaluateGoodList,
				applyRefund,
				refundGoodList,
				toComments,
				gotoGoodDetail
			}
		},
		async onLoad(option) {
			await this.initData(option.index);
		},
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: $background-color;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
				font-size: 30rpx;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;
			justify-content: space-between;

			.left {
				flex: 1;
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				flex: 2;

				.title {
					font-size: 32rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 30rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 30rpx;
					display: flex;
					align-items: center;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;
				flex: 1;
				font-size: 32rpx;

				.decimal {
					font-size: 30rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 30rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 30rpx;

			.total-price {
				font-size: 34rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.bottom_right {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.btn {
					line-height: 52rpx;
					width: 160rpx;
					border-radius: 26rpx;
					border: 2rpx solid $u-border-color;
					font-size: 26rpx;
					text-align: center;
					color: $u-type-info-dark;
				}

				.cancel {
					margin-right: 30rpx;
				}

				.pay {
					color: $u-type-success-dark;
					border-color: $u-type-success-dark;
				}
			}


		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
		position: relative;
		padding-bottom: 20rpx;
		background-color: $background-color;


		.u-tabs-box {
			position: fixed;
			width: 100%;
			z-index: 99;
		}

		.swiper-box {
			flex: 1;
			height: 100%;
			width: 100%;
			margin-top: 80rpx;
		}
	}

	.noneWrap {
		display: none;
	}


	.swiper-item {
		height: 100%;
	}
</style>
