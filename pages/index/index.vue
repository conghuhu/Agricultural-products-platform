<template>
	<view class="content">
		<view v-show="!loading && !videoLoading">
			<video class="video_back" objectFit="cover" :controls="false" :autoplay="true" :loop="true" :muted="true"
				@loadedmetadata="loadedmetadata"
				src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/back.mp4?sign=4d164a9b2c6a6b1d384eb48b89a8a212&t=1653992455"></video>

			<view class="logo">
				<u-image width="600rpx" mode="aspectFit" height="600rpx" src="/static/images/logo.png">
				</u-image>
			</view>
			<view v-if="!mask" class="action">
				<u-button :customStyle="touristStyle" type="primary" shape="circle" @click="touristLogin">我是游客
				</u-button>
				<u-button :customStyle="merChantStyle" :plain="true" type="primary" shape="circle"
					@click="merChantLogin">我是商家</u-button>
			</view>
			<u-top-tips ref="uToast" :navbar-height="statusBarHeight"></u-top-tips>
		</view>
	</view>
</template>

<script lang="ts">
	import request from '@/api/request';
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	import {
		userStore
	} from '@/stores/user';
	import {
		merchantStore
	} from '@/stores/merchant';
	export default {
		setup() {
			const user = userStore();
			const merchant = merchantStore();
			const uToast = ref(null);

			const loading = ref(true);
			const videoLoading = ref(true);
			const mask = ref(false);
			const touristStyle = reactive({
				marginBottom: '40rpx',
				backgroundColor: '#F5B05F',
				fontWeight: 'bold'
			});
			const merChantStyle = reactive({
				color: '#F5B05F !important',
				backgroundColor: 'transparent !important',
				fontWeight: 'bold'
			});

			const statusBarHeight = computed(() => uni.getSystemInfoSync().statusBarHeight);
			async function merChantLogin() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				const res = await wx.getUserProfile({
					desc: '用于身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				});
				wx.showLoading({
					title: '加载中'
				});
				const result = await request("login", {
					userInfo: res.userInfo,
					status: 0, // 商家
					type: 'merChantLogin'
				});
				user.updateUserInfo(result);
				await wx.setStorage({
					key: "userInfo",
					data: Object.assign(res.userInfo, result),
					encrypt: true,
				})
				wx.hideLoading();
				uToast.value && uToast.value.show({
					title: '登录商家端,可在我的-设置中切换身份',
					type: 'success',
				});
				setTimeout(() => {
					uni.redirectTo({
						url: "/pages/Merchants/Shop/Shop"
					})
				}, 1500)
			}

			async function touristLogin() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				const res = await wx.getUserProfile({
					desc: '用于身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				});
				wx.showLoading({
					title: '加载中'
				})
				const result = await request("login", {
					userInfo: res.userInfo,
					status: 1, // 游客
					type: 'touristLogin'
				});
				user.updateUserInfo(result);
				await wx.setStorage({
					key: "userInfo",
					data: Object.assign(res.userInfo, result),
					encrypt: true,
				});
				wx.hideLoading();
				uToast.value && uToast.value.show({
					title: '登录用户端,可在我的-设置中切换身份',
					type: 'success',
				});
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/Tourists/HomeBar/HomeBar"
					})
				}, 1500);
			}

			const loadedmetadata = (e) => {
				videoLoading.value = false;
			};

			/**
			 * 初始化商家数据
			 */
			const initMerchantData = async () => {
				const allRes = await Promise.all([request('order', {
					type: 'queryOrderStatusMerchant'
				}), request("shop", {
					type: "checkCreatedShop"
				})]);
				console.log(allRes);
				user.setOrderMap(allRes[0].data, 0);
				merchant.initShopInfo(allRes[1].data[0]);
			}

			/**
			 * 初始化游客数据
			 */
			const initTouristData = async () => {
				const allRes = await Promise.all([request('wanted', {
					type: 'getWanted'
				}), request('star_focus', {
					type: 'getOneStarList'
				}), request('order', {
					type: 'queryOrderStatus'
				})]);
				console.log(allRes);

				// wanted
				let count = 0;
				allRes[0].data.forEach(item => {
					count += item.count;
					user.wantingGoods.set(item.goodId, item.count);
				});
				user.setTotalWantedGoods(count);

				// star_focus
				allRes[1].data.forEach(item => {
					user.addToLikeShareSet(item);
				});

				// order
				user.setOrderMap(allRes[2].data, 1);
			}
			return {
				user,
				loading,
				videoLoading,
				merChantLogin,
				touristLogin,
				touristStyle,
				merChantStyle,
				mask,
				loadedmetadata,
				initTouristData,
				initMerchantData,
				uToast,
				statusBarHeight
			}
		},
		async onLoad() {

		},
		async onReady() {
			wx.showLoading({
				title: '初始化'
			})
			const res = await request("login", {
				type: 'checkLogin'
			});

			if (res.data.length === 1) {
				const currentUserInfo = res.data[0];

				this.mask = true;
				const curStatus = currentUserInfo.status;
				this.user.updateUserInfo(currentUserInfo);

				if (curStatus == 0) {
					this.initMerchantData();
				} else if (curStatus == 1) {
					this.initTouristData();
				} else {
					throw new Error('未知的人员类型');
				}

				this.loading = false;
				wx.hideLoading();
				this.uToast.show({
					title: `登录${curStatus == 0 ? '商家端':'用户端'},可在我的-设置中切换身份`,
					type: 'success',
				})
				setTimeout(() => {
					if (curStatus == 0) {
						uni.redirectTo({
							url: "/pages/Merchants/Shop/Shop"
						})
					} else if (curStatus == 1) {
						uni.switchTab({
							url: "/pages/Tourists/HomeBar/HomeBar"
						})
					}
				}, 2000);
			} else {
				this.loading = false;
				wx.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;

		.video_back {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 0;
		}

		.logo {
			margin-top: 8vh;
		}

		.action {
			position: absolute;
			top: 70vh;
			left: 50%;
			transform: translateX(-50%);
			width: 50vw;
			padding: 6rpx;
		}
	}
</style>
