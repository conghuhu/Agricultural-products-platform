<template>
	<view class="content">
		<view v-show="!loading">
			<video class="video_back" objectFit="cover" :controls="false" :autoplay="true" :loop="true" :muted="true"
				src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/back.mp4?sign=4d164a9b2c6a6b1d384eb48b89a8a212&t=1653992455"></video>

			<view class="logo">
				<u-image width="600rpx" mode="aspectFit" height="600rpx"
					src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E4%B9%A1%E6%9D%91%E6%8C%AF%E5%85%B4.png?sign=dec378640f98a169e7c8937bc31268aa&t=1653992588">
				</u-image>
			</view>
			<view v-if="!mask" class="action">
				<u-button :customStyle="touristStyle" type="primary" shape="circle" @click="touristLogin">我要游客
				</u-button>
				<u-button :customStyle="merChantStyle" :plain="true" type="primary" shape="circle"
					@click="merChantLogin">我是商家</u-button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import request from '@/api/request';
	import {
		ref,
		reactive
	} from 'vue';
	import {
		userStore
	} from '@/stores/user';
	export default {
		setup() {
			const user = userStore();
			const loading = ref(true);
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
				await wx.setStorage({
					key: "userInfo",
					data: Object.assign(res.userInfo, result),
					encrypt: true,
				})
				wx.hideLoading();
				uni.redirectTo({
					url: "../../pages/Merchants/Shop/Shop"
				})
			}

			async function touristLogin() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				const res = await wx.getUserProfile({
					desc: '用于身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				});
				wx.showLoading()
				const result = await request("login", {
					userInfo: res.userInfo,
					status: 1, // 游客
					type: 'touristLogin'
				});
				await wx.setStorage({
					key: "userInfo",
					data: Object.assign(res.userInfo, result),
					encrypt: true,
				})
				wx.hideLoading();
				uni.redirectTo({
					url: "../../pages/Tourists/HomeBar/HomeBar"
				})
			}
			return {
				user,
				loading,
				merChantLogin,
				touristLogin,
				touristStyle,
				merChantStyle,
				mask
			}
		},
		async onLoad() {
			wx.showLoading({
				title: '初始化'
			})
			const res = await request("login", {
				type: 'checkLogin'
			});

			if (res.data.length === 1) {
				console.log(res.data);
				this.mask = true;
				const curStatus = res.data[0].status;
				this.user.updateUserInfo(res.data[0]);

				this.loading = false;
				wx.hideLoading();

				setTimeout(() => {
					if (curStatus == 0) {
						uni.redirectTo({
							url: "../../pages/Merchants/Shop/Shop"
						})
					} else if (curStatus == 1) {
						uni.switchTab({
							url: "../../pages/Tourists/HomeBar/HomeBar"
						})
					}
				}, 1600);

			} else {
				this.loading = false;
				wx.hideLoading();
			}

		},
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
