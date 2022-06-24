<template>
	<view class="fullScreen">
		<Nav title="设置" isBack />
		<view class="content">
			<u-cell-group>
				<u-cell-item icon="man-add" title="切换身份" @click="changeStatus"></u-cell-item>
				<u-cell-item style="position: relative;" icon="home" title="授权管理">
					<button style="opacity: 0;position: absolute;top: 0;left: 0;width: 700rpx;height: 90rpx;" open-type="openSetting">999</button>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	export default {
		setup() {
			const changeStatus = async () => {
				uni.showLoading({
					title: '切换中'
				})
				const res = await request('user', {
					type: 'changeStatus'
				})
				uni.hideLoading();
				console.log(res);
				uni.redirectTo({
					url: '/pages/index/index'
				})
			};

			return {
				changeStatus
			}
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
			background-color: $background-color;
		}
	}
</style>
