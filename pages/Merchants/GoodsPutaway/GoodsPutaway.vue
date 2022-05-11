<template>
	<view>
		8888
		<u-tabbar v-model="current" :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	export default {
		setup() {
			const list = reactive([{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '店铺',
					count: 2,
					isDot: true,
					customIcon: false,
					custom: true,
					pagePath: "/pages/Merchants/Shop/Shop",
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '学习',
					customIcon: false,
					custom: true,
					pagePath: "/pages/Merchants/LearnCenter/LearnCenter"
				},
				{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '上架',
					midButton: true,
					customIcon: false,
					custom: true,
					pagePath: "/pages/Merchants/GoodsPutaway/GoodsPutaway"
				},
				{
					iconPath: "shopping-cart",
					selectedIconPath: "shopping-cart-fill",
					text: '订单',
					customIcon: false,
					custom: true,
					pagePath: "/pages/Merchants/OrderCenter/OrderCenter"
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					count: 23,
					isDot: false,
					customIcon: false,
					custom: true,
					pagePath: "/pages/Merchants/PersonCenter/PersonCenter"
				},
			]);
			const current = ref(0);
			return {
				list,
				current
			}
		}
	}
</script>

<style>

</style>
