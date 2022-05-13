<template>
	<view class="fullScreen">
		<Nav title="我的店铺" />
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
			<view class="top_card">
				<view class="card_head">
					<u-avatar bg-color="#ffaa00" :text="shopInfo.shopName" mode="square"></u-avatar>
					<view class="right">
						<view class="shop_name">
							{{shopInfo.shopName}}
						</view>
						<u-rate disabled :count="5" v-model:value="star" active-color="yellow"></u-rate>
					</view>
				</view>
				<view class="card_content">
					<view class="item">
						粉丝数：{{shopInfo.focus}}
					</view>
					<view class="item">
						总收入：{{shopInfo.profile || 0}} 元
					</view>
					<view class="item">
						入驻天数：{{day || 0}} 天
					</view>
				</view>
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
			})

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
				star
			}
		},
		async onLoad() {
			await this.getShopInfo();
		},
		async onReady() {
			const res = await this.getUserInfoFromLocal();
			this.createShopForm.username = res.nickName;
			this.isNew && this.createShopFormRef.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;

		.content {
			height: calc(100vh - 145px);
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			.top_card {
				height: 150px;
				width: 95%;
				margin: 10px;
				border-radius: 5px;
				background-color: #59ff88;
				padding: 10px;

				.card_head {
					width: 100%;
					padding-left: 5px;
					display: flex;
					align-items: center;

					.right {
						display: flex;
						flex-direction: column;
						margin-left: 15px;

						.shop_name {
							font-size: 17px;
							font-weight: 500;
							color: white;
							margin-bottom: 5px;
						}
					}
				}

				.card_content {
					color: white;
					margin: 10px;
					margin-left: 6px;

					.item {
						margin-bottom: 10px;
					}
				}
			}
		}

		.createFormContent {
			padding: 20px;
		}
	}
</style>
