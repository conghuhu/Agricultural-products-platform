<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<u-button type="primary" @click="merChantLogin">我是商家</u-button>
		<u-button type="primary" @click="touristsLogin">我要游客</u-button>
	</view>
</template>

<script lang="ts">
	import {
		ref
	} from 'vue'
	import request from '@/api/request';

	export default {
		setup() {
			const title = ref("hello");

			async function merChantLogin() {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				// const res = await wx.getUserProfile({
				// 	desc: '用于身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				// });
				// console.log(res);
				// wx.showLoading({
				// 	title: '加载中',
				// })
				// const result = await request("login", {
				// 	userInfo: res.userInfo,
				// 	status: 'merChant'
				// });
				// await wx.setStorage({
				// 	key: "userInfo",
				// 	data: Object.assign(res.userInfo, result.result),
				// 	encrypt: true,
				// })
				// wx.hideLoading();
				uni.reLaunch({
					url:"../../pages/Merchants/index"
				})
			}
			async function touristsLogin(){
				
				await uni.reLaunch({
					url:"../../pages/Tourists/HomeBar/HomeBar"
				})
				
			}

			return {
				title,
				merChantLogin,
				touristsLogin
			}
		},
		onLoad() {
			request("hello", {}).then((res) => {
				console.log(res);
			})
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
