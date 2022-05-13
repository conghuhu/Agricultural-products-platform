<template>
	<view class="content">
		<view v-show="!loading">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>

			<u-button type="primary" @click="merChantLogin">我是商家</u-button>
			<u-button type="primary" @click="touristLogin">我要游客</u-button>
		</view>

	</view>
</template>

<script lang="ts">
	import request from '@/api/request';
	import {
		ref
	} from 'vue';
	export default {
		setup() {
			const title = ref("hello");
			const loading = ref(true);
			async function merChantLogin() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				const res = await wx.getUserProfile({
					desc: '用于身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				});
				wx.showLoading();
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
				wx.showLoading({
					title: '加载中',
				})
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
				title,
				loading,
				merChantLogin,
				touristLogin
			}
		},
		async onLoad() {
			wx.showLoading({
				title: '',
			})
			const res: {
				data: any[]
			} = await request("login", {
				type: 'checkLogin'
			})

			if (res.data.length === 1) {
				const curStatus = res.data[0].status;
				if (curStatus == 0) {
					uni.redirectTo({
						url: "../../pages/Merchants/Shop/Shop"
					})
				} else if (curStatus == 1) {
					uni.switchTab({
						url: "../../pages/Tourists/HomeBar/HomeBar"
					})
				}
			}
			this.loading = false
			wx.hideLoading();
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
