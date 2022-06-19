<template>
	<view class="fullScreen">
		<NavTransparent />
		<view class="content">
			<view class="shopBack" />
			<view class="shopContent">
				<view class="shopTitle">
					<view class="shopAvatar" />
					<view class="shop_name">
						{{shopInfo.shopName}}
					</view>
					<u-rate disabled :count="5" v-model:value="star" active-color="#77D4A6"></u-rate>
				</view>
				<view class="shopData">
					<view class="shopDataItem">
						<view class="shopDataItem_data">
							{{day || 0}}
						</view>
						<view class="shopDataItem_desc">
							入驻天数
						</view>
					</view>
					<view class="shopDataItem">
						<view class="shopDataItem_data">
							{{shopInfo.focus || 0}}
						</view>
						<view class="shopDataItem_desc">
							粉丝数量
						</view>
					</view>
					<view class="shopDataItem">
						<view class="shopDataItem_data">
							{{shopInfo.profile || 0}}
						</view>
						<view class="shopDataItem_desc">
							收入金额
						</view>
					</view>
				</view>
			</view>
			<view class="goodList">
				<view class="goodList_top">
					<view class="goodList_top_title">
						本店商品:
					</view>
					<view class="search">
						<u-search borderColor="#909399" :show-action="false" placeholder="请输入商品关键字" v-model="searchVal"
							@search="getGoodList" @clear="getGoodList">
						</u-search>
					</view>
				</view>

				<MyLoading v-if="goodListLoading" />

				<block v-else>
					<view v-if="goodList.length == 0" style="padding-top: 100rpx;">
						<u-empty text="商品为空" mode="data">
						</u-empty>
					</view>
					<u-waterfall v-else v-model="goodList">
						<template v-slot:left="{leftList}">
							<view v-for="(item, index) in leftList" :key="item._id">
								<GoodSimpleCard :item="item" :isShop="false" />
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view v-for="(item, index) in rightList" :key="item._id">
								<GoodSimpleCard :item="item" :isShop="false" />
							</view>
						</template>
					</u-waterfall>
				</block>

			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		watch,
		onMounted,
		computed
	} from 'vue';
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import {
		commonStore
	} from '@/stores/store';
	import {
		storeToRefs
	} from 'pinia';
	import dayjs from "dayjs";
	export default {
		setup() {
			const searchVal = ref('');

			const buttonStyle = reactive({
				margin: '15px'
			});
			/**
			 * 店铺信息
			 */
			const shopInfo = reactive({
				createTime: "",
				description: "",
				focus: 0,
				phone: "",
				shopName: "",
				star: 0,
				username: "",
				_id: "",
				_openid: ""
			});
			const star = computed(() => {
				console.log(shopInfo)
				return shopInfo.star;
			});

			/**
			 * 商品列表
			 */
			const goodList = reactive([]);

			/**
			 * 计算店铺运营的天数
			 */
			const day = computed(() => {
				const now = dayjs();
				const start = dayjs(shopInfo.createTime || now);
				return now.diff(start, 'day');
			})

			const goodListLoading = ref(true);

			/**
			 * 获取商品列表
			 */
			const getGoodList = async () => {
				goodListLoading.value = true;
				const res: {
					data: Array < any >
				} = await request('goods', {
					type: 'getGoods',
					shopId: shopInfo._id,
					keyword: searchVal.value
				})
				console.log(res);
				goodList.length = 0;
				res.data.forEach(item => {
					goodList.push(item);
				});
				goodListLoading.value = false;
			}

			/**
			 * 获取商铺信息
			 */
			const getShopInfo = async () => {
				const res = await request("shop", {
					type: "getShopInfo",
					shopId: shopInfo._id
				});

				Object.assign(shopInfo, res.data);

				await getGoodList();
			}


			return {
				searchVal,
				buttonStyle,
				shopInfo,
				star,
				goodList,
				day,
				getGoodList,
				getShopInfo,
				goodListLoading,
			}
		},
		async onLoad(option) {
			console.log(option);
			this.shopInfo._id = option.shopId;
			await this.getShopInfo();
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
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: $background-color;

			.shopBack {
				width: 100%;
				height: 30vh;
				background-image: url('https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/shopback.webp?sign=24c799b2e77b1d3078a11768789e879c&t=1652499708');
				background-size: cover;
				background-repeat: no-repeat;
				position: absolute;
				top: 0;
				z-index: 0;
			}

			.shopContent {
				width: 100%;
				z-index: 99;
				margin-top: 14vh;

				.shopTitle {
					display: flex;
					flex-direction: column;
					align-items: center;

					.shopAvatar {
						width: 42vw;
						height: 42vw;
						border-radius: 24rpx;
						border: 15rpx solid white;
						background-image: url('https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/shopAvatar.jpg?sign=86737ed47c27d68c83cba096cbd8aaaa&t=1652501346');
						background-size: cover;
						background-repeat: no-repeat;
					}

					.shop_name {
						font-size: 56rpx;
						font-weight: 600;
						line-height: 90rpx;
					}

				}

				.shopData {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					margin-top: 15px;
					margin-bottom: 15px;

					.shopDataItem {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						text-align: center;

						.shopDataItem_data {
							font-weight: 550;
							line-height: 50rpx;
						}

						.shopDataItem_desc {
							color: #999999;
						}
					}
				}
			}

			.goodList {
				width: 100%;
				margin-top: 20rpx;

				.goodList_top {
					display: flex;
					justify-content: space-around;
					align-items: center;
					padding-left: 50rpx;
					padding-right: 50rpx;
					margin-bottom: 20rpx;

					.goodList_top_title {
						font-size: 36rpx;
						font-weight: 550;
						min-width: 180rpx;
					}

					.search {
						width: 100%;
					}
				}

			}
		}

	}
</style>
