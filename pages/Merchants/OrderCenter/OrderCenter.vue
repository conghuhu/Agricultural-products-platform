<template>
	<view class="fullScreen">
		<Nav title="订单中心" />
		<view class="content">

		</view>
		<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	export default {
		setup() {
			const list = reactive(navList);
			return {
				list
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: $background-color;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: $background-color;
		}
	}
</style>
