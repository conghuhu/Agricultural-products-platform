<template>
	<view class="fullScreen">
		<Nav title="订单" :isBack="true" />
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#4CC818" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<view v-show="loading">
				<MyLoading />
			</view>
			<view :style="loading ? 'display: none;' :'height:100%'">
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
								<OrderEmpty v-if="orderList[1].length == 0" />
								<view v-else class="order" v-for="(res, index) in  orderList[1]" :key="res._id">
									<view class="top">
										<view class="left">
											<view class="store">{{ dayjs(res.createTime).format('YYYY-MM-DD HH:mm') }}
											</view>
										</view>
										<view class="right">待收货</view>
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
											<view class="cancel btn">查看物流</view>
											<view class="pay btn">确认收货</view>
										</view>
									</view>
								</view>
								<!-- <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore> -->
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;">
							<view class="page-box">
								<OrderEmpty v-if="orderList[2].length == 0" />
								<view v-else class="order" v-for="(res, index) in  orderList[2]" :key="res._id">
									<view class="top">
										<view class="left">
											<view class="store">{{ dayjs(res.createTime).format('YYYY-MM-DD HH:mm') }}
											</view>
										</view>
										<view class="right">已完成</view>
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
											<view class="cancel btn">取消订单</view>
											<view class="pay btn">立即支付</view>
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
								<OrderEmpty v-if="orderList[3].length == 0" />
								<view v-else class="order" v-for="(res, index) in  orderList[3]" :key="res._id">
									<view class="top">
										<view class="left">
											<view class="store">{{ dayjs(res.createTime).format('YYYY-MM-DD HH:mm') }}
											</view>
										</view>
										<view class="right">已完成</view>
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
											<view class="cancel btn">取消订单</view>
											<view class="pay btn">立即支付</view>
										</view>
									</view>
								</view>
								<!-- <u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore> -->
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
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
	export default {
		setup() {
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
					name: '已完成',
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
				if (current.value != 2) {
					loadStatus.splice(current.value, 1, "loading")
					setTimeout(() => {
						getOrderList(current.value);
					}, 1200);
				}
			};

			// 获取某页面数据
			const getOrderList = (idx) => {
				// dataList.forEach(item => {
				// 	orderList[idx].push(item);
				// })
				loadStatus.splice(current.value, 1, "loadmore")
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
				getOrderList(index);
			};

			const transition = ({
				detail: {
					dx
				}
			}) => {
				tabs.value.setDx(dx);
			};
			const animationfinish = (e) => {
				const detail = e.detail;
				tabs.value.setFinishCurrent(detail.current);
				swiperCurrent.value = detail.current;
				current.value = detail.current;
			}

			/**
			 * 取消订单
			 */
			const cancelOrder = async (item) => {
				console.log(item);
				const res = await request('order', {
					type: 'cancelOrder',
					orderId: item._id
				});
				console.log(res);
			}

			/**
			 * 支付订单
			 */
			const payOrder = async (item) => {
				console.log(item);
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
				payOrder
			}
		},
		async onLoad(option) {
			// index 1：待支付  2：已付款，但未收到货  3：已收到货，待评价 4：彻底完成
			const resArr = await Promise.all([request("order", {
				type: 'queryUnpaidOrders'
			}), request("order", {
				type: 'queryIngOrders'
			}), request("order", {
				type: 'queryEvaluateOrder'
			}), request("order", {
				type: 'queryCompletedOrders'
			})]);
			console.log(resArr);
			// 向四个页面的数组赋值
			for (let i = 0; i < 4; i++) {
				const dataList = resArr[i].data;
				this.list[i].count = dataList.length;
				dataList.forEach(item => {
					this.orderList[i].push(item);
				})
			}
			this.change(option.index);
			this.loading = false;
		},
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F3F3F3;
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
	}

	.noneWrap {
		display: none;
	}

	.swiper-box {
		flex: 1;
		height: 100%;
	}

	.swiper-item {
		height: 100%;
	}
</style>
