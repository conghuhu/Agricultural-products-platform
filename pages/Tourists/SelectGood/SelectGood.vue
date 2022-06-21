<template>
	<view class="fullScreen">
		<Nav title="选择商品" isBack />
		<view class="content">
			<view class="search">
				<view class="search_contain">
					<u-search placeholder="请输入关键字" borderColor="#abaaaa" v-model="keyword" :focus="true"
						:clearabled="true" :show-action="false" @search="searchContent"></u-search>
				</view>
				<view class="search_btn">
					<u-button :custom-style="search_btn_style" type="primary" @click="searchContent">搜索</u-button>
				</view>
			</view>

			<view class="body">
				<view v-if="loading"
					style="width:100%;height: 70vh;display: flex;align-items: center;justify-content: center;">
					<MyLoading />
				</view>

				<view style="padding-bottom: 100rpx;" v-else>
					<view class="card" v-for="(item, index) in goodList" :key="item._id">
						<u-checkbox v-model="item.checked" :name="item._id" :size="44"
							:icon-size="28" @change="selectGood">
							<view class="good_content">
								<view class="list_left">
									<u-image height="25vw" width="25vw" mode="aspectFit" :src="item.imageShowList[0]">
									</u-image>
								</view>
								<view class="list_right">
									<view class="right_top">
										<Ellipsis :content="item.goodName" :width="380" />
									</view>
									<view class="right_mid">
										<Ellipsis :content="item.description" :width="400" />
									</view>
									<view class="right_bottom">
										<view class="bottom_left">
											{{item.goodPrice}}元/{{item.unit}}
										</view>
										<view class="bottom_right">
										</view>
									</view>
								</view>
							</view>
						</u-checkbox>
					</view>
				</view>
				<view class="action_bottom">
					<view class="left">

					</view>
					<view class="right">
						<view class="price">
							<view style="margin-right: 10rpx;">
								合计:
							</view>
							<view style="color: #ff0000;">
								{{totalCount}} 个
							</view>
						</view>
						<u-button @click="submitGoodList" style="width: 146rpx;margin-right: 10rpx;margin-left: 20rpx;"
							type="primary">确定
						</u-button>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import getUUID from '@/utils/getUUID';
	import request from '@/api/request';

	export default {
		setup() {
			const eventChannel = reactive({});
			const keyword = ref('');
			const goodList = reactive([]);
			const loading = ref(true);

			const totalCount = computed(() => {
				let total: number = 0;
				goodList.forEach(item => {
					if (item.checked) {
						total += 1;
					}
				});
				return total;
			});

			const searchContent = async () => {
				loading.value = true;
				const {
					data: list
				} = await request('goods', {
					type: 'getGoodsByKeyword',
					keyword: keyword.value,
					orderType: 'price',
					categoryIdList: [],
					priceRange: [NaN, NaN]
				})
				goodList.length = 0;
				list.forEach(item => {
					goodList.push({
						...item,
						checked: false
					});
				})
				loading.value = false;
				console.log(list);
			}

			const selectGood = (e) => {
				goodList.forEach(item => {
					if (item._id == e.name) {
						item.checked = e.value;
					} else {
						item.checked = false;
					}
				})
			}

			const submitGoodList = () => {
				const ans = goodList.filter(item => item.checked);
				if (ans.length == 0) {
					uni.showToast({
						icon: 'error',
						title: "请选一个商品"
					})
					return;
				};
				eventChannel.emit('acceptSelectedGood', ans[0]);
				uni.navigateBack();
			}

			return {
				eventChannel,
				keyword,
				searchContent,
				loading,
				goodList,
				totalCount,
				submitGoodList,
				selectGood
			}
		},
		onLoad(option) {
			Object.assign(this.eventChannel, this.getOpenerEventChannel());
			this.searchContent();
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: $background-color;
		position: relative;

		.content {
			position: relative;
			background-color: $background-color;

			.search {
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				padding-right: 20rpx;

				.search_contain {
					flex: 10;
					width: 100%;
					margin-right: 20rpx;
				}

				.search_btn {
					flex: 1;
					width: 100%;
				}
			}

			.body {
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
					bottom: calc(env(safe-area-inset-bottom));
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
	}
</style>
