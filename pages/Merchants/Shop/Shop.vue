<template>
	<view class="fullScreen">
		<view class="content" v-if="isNew">
			<u-empty text="还没有个人商铺" mode="list">
				<template #bottom>
					<u-button :customStyle="buttonStyle" type="primary" @click="createShop">去创建</u-button>
				</template>
			</u-empty>

			<u-modal title="创建商铺" v-model="createShopShow" confirm-text="创建" cancel-text="去了解我们平台"
				:show-cancel-button="true" @confirm="submitCreateShop">
				<view class="slot-content">
					<view class="createFormContent">
						<u-form :model="createShopForm" ref="createShopFormRef">
							<u-form-item label="用户名" prop="username">
								<u-input v-model="createShopForm.username" placeholder="请输入用户名" />
							</u-form-item>
							<u-form-item label="手机号" prop="phone">
								<u-input v-model="createShopForm.phone" placeholder="请输入手机号" />
							</u-form-item>
							<u-form-item label="商铺名" prop="shopName">
								<u-input v-model="createShopForm.shopName" placeholder="请输入商铺名" />
							</u-form-item>
							<u-form-item label="简介" prop="description">
								<u-input v-model="createShopForm.description" type="textarea" placeholder="请输入商铺简介" />
							</u-form-item>
						</u-form>
					</view>
				</view>
			</u-modal>


		</view>
		<view class="content" v-else>
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
						<u-search :show-action="false" placeholder="请输入商品关键字" v-model="searchVal"></u-search>
					</view>
				</view>

				<MyLoading v-if="goodListLoading" />

				<block v-else>
					<view v-if="goodList.length == 0" style="padding-top: 100rpx;">
						<u-empty text="本店还没有上架商品" mode="data">
							<template #bottom>
								<u-button :customStyle="buttonStyle" type="primary" @click="goToAddGood">去上架</u-button>
							</template>
						</u-empty>
					</view>
					<u-waterfall v-else v-model="goodList">
						<template v-slot:left="{leftList}">
							<view v-for="(item, index) in leftList" :key="item._id">
								<GoodSimpleCard :item="item" />
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view v-for="(item, index) in rightList" :key="item._id">
								<GoodSimpleCard :item="item" />
							</view>
						</template>
					</u-waterfall>
				</block>

			</view>
		</view>
		<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	import request from '@/api/request';
	import dayjs from "dayjs";

	export default {
		setup() {
			const list = reactive(navList);
			const isNew = ref(false);
			const createShopShow = ref(false);

			const searchVal = ref('');

			const buttonStyle = reactive({
				margin: '15px'
			});

			const createShopForm = reactive({
				username: '',
				phone: '',
				shopName: '',
				description: ''
			});

			const rules = ref({
				username: [{
					required: true,
					message: '请输入姓名',
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['change', 'blur'],
				}],
				phone: [{
					required: true,
					min: 11,
					message: '请输入正确的手机号',
					trigger: 'blur'
				}],
				shopName: [{
					required: true,
					message: '给你的商铺起个名字叭~',
				}]
			})
			/**
			 * 创建表单ref
			 */
			let createShopFormRef = ref(null);
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

			/**
			 * 创建个人商铺
			 */
			const createShop = async () => {
				createShopShow.value = true;
			}
			/**
			 * 提交创建商铺请求
			 */
			const submitCreateShop = async () => {
				createShopShow.value = true;
				wx.showLoading({
					title: '创建中',
				})
				await createShopFormRef.value.validate(async (valid) => {
					if (valid) {
						const res = await request("shop", {
							type: "createShop",
							createShopForm
						})
						wx.hideLoading();
						createShopShow.value = false;
						wx.showToast({
							icon: res.res.success ? 'success' : 'error',
							title: res.res.message
						})
						// 刷新
						await getShopInfo();
					} else {
						console.log("验证失败")
					}
				})

			}
			/**
			 * 从本地获取用户信息
			 */
			const getUserInfoFromLocal = async () => {
				try {
					const res = await wx.getStorage({
						key: 'userInfo',
						encrypt: true,
					})
					return res.data;
				} catch (e) {
					console.trace(e);
				}
			}
			/**
			 * 获取商铺信息
			 */
			const getShopInfo = async () => {
				const {
					res
				} = await request("shop", {
					type: "checkCreatedShop"
				});
				const temp = res.data.length == 0;
				if (!temp) {
					Object.assign(shopInfo, res.data[0]);
				}
				isNew.value = temp;

				await getGoodList();
			}

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
					shopId: shopInfo._id
				})
				console.log(res);
				goodList.length = 0;
				res.data.forEach(item => {
					goodList.push(item);
				});
				goodListLoading.value = false;
			}

			const goToAddGood = async () => {
				uni.navigateTo({
					url: "/pages/Merchants/GoodsPutaway/GoodsPutaway"
				})
			}

			return {
				list,
				isNew,
				createShop,
				buttonStyle,
				createShopShow,
				createShopForm,
				createShopFormRef,
				shopInfo,
				rules,
				getUserInfoFromLocal,
				submitCreateShop,
				getShopInfo,
				day,
				star,
				searchVal,
				getGoodList,
				goodList,
				goToAddGood,
				goodListLoading
			}
		},
		async onLoad() {
		},
		async onReady() {
			const res = await this.getUserInfoFromLocal();
			this.createShopForm.username = res.nickName;
			this.isNew && this.createShopFormRef.setRules(this.rules);
		},
		async onShow() {
			await this.getShopInfo();
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

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
						.shopDataItem_data{
							font-weight: 550;
							line-height: 50rpx;
						}
						.shopDataItem_desc{
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

		.createFormContent {
			padding: 20px;
		}
	}
</style>
