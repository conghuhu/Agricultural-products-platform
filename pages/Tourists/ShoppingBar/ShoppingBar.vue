<template>
	<view class="fullScreen">
		<Nav title="我的购物车"></Nav>
		<view class="content">
			<view v-if="loading" style="height: 70vh;display: flex;align-items: center;">
				<MyLoading />
			</view>
			<block v-else>
				<view class="card" v-for="(item, index) in wantList" :key="item._id">
					<u-checkbox :labelDisabled="true" @change="checkboxChange" v-model="item.checked" :name="item._id"
						:size="44" :icon-size="28">
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
										<u-number-box v-model="item.count" disabled-input :index="item._id"
											@plus="incCount" @minus="decCount" :input-width="70" :input-height="60">
										</u-number-box>
									</view>
								</view>
							</view>
						</view>
					</u-checkbox>
				</view>
				<view class="action_bottom">
					<view class="left">

					</view>
					<view class="right">
						<view class="price">
							<view>
								合计:
							</view>
							<view style="color: #ff0000;">
								￥{{totalPrice}}
							</view>
						</view>
						<u-button @click="gotoSubmitOrder" style="width: 146rpx;margin-right: 10rpx;margin-left: 20rpx;"
							type="primary">结算
						</u-button>
					</view>
				</view>
			</block>

		</view>
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
	</view>


</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import {
		commonStore
	} from '@/stores/store';
	export default {
		setup() {
			const user = userStore();
			const store = commonStore();
			const list = reactive(navList)
			const wantList = reactive([]);
			const loading = ref(true);
			/**
			 * 所选商品总计
			 */
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
			const incCount = async (e) => {
				const target = wantList.find(item => item._id == e.index);
				request('wanted', {
					type: 'addWanted',
					count: e.value,
					goodId: target.goodId
				});
				user.incrementWantedGood(target.goodId);
			};
			const decCount = async (e) => {
				const target = wantList.find(item => item._id == e.index);
				user.decrementWantedGood(target.goodId);

				if (e.value == 0) {
					await request('wanted', {
						type: 'deleteWanted',
						wantedId: e.index
					});
					refresh();
				} else {
					request('wanted', {
						type: 'deleteWanted',
						wantedId: e.index
					});
				}
			};

			/**
			 * 刷新界面
			 */
			const refresh = async () => {
				loading.value = true;
				const res = await request('wanted', {
					type: 'getWanted'
				});
				wantList.length = 0;
				res.data.forEach(item => {
					wantList.push(item);
				});
				loading.value = false;
			}
			const checkboxChange = async (e) => {
				request('wanted', {
					type: 'changeChecked',
					wantId: e.name,
					checked: e.value
				});
			}
			/**
			 * 跳转至提交订单
			 */
			const gotoSubmitOrder = async () => {
				const checkedList = wantList.filter(item => item.checked);
				if (checkedList.length == 0) {
					uni.showToast({
						title: '请选择商品'
					})
					return;
				}
				store.clearCurSumbitOrderList();
				store.addCurSumbitOrderList(checkedList);
				uni.navigateTo({
					url: '/pages/Tourists/SubmitOrder/SubmitOrder'
				});
			};
			return {
				list,
				wantList,
				incCount,
				decCount,
				checkboxChange,
				loading,
				refresh,
				totalPrice,
				gotoSubmitOrder
			}
		},
		async onShow() {
			await this.refresh();
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F3F3F3;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: #F3F3F3;
			padding: 20rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-bottom: 60rpx;

			.card {
				padding: 16rpx 0 16rpx 16rpx;
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
						min-width: 420rpx;

						.right_top {
							margin: 4rpx;
							margin-bottom: 20rpx;
							font-size: 38rpx;
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

							.bottom_right {
								margin-right: 10rpx;
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
				bottom: 100rpx;
				z-index: 600;

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
	}
</style>
