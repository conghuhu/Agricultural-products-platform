<template>
	<view>
		<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	export default {
		setup() {
			const list = reactive([{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '首页',
					count: 2,
					isDot: true,
					customIcon: false,
					pagePath: "/pages/Tourists/HomeBar/HomeBar",
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '分类',
					customIcon: false,
					pagePath: "/pages/Tourists/ClassificationBar/ClassificationBar"
				},
				{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '菜单',
					midButton: true,
					customIcon: false,
					pagePath: "/pages/Tourists/MenuBar/MenuBar"
				},
				{
					iconPath: "shopping-cart",
					selectedIconPath: "shopping-cart-fill",
					text: '购物车',
					customIcon: false,
					pagePath: "/pages/Tourists/ShoppingBar/ShoppingBar"
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					count: 23,
					isDot: false,
					customIcon: false,
					pagePath: "/pages/Tourists/MeBar/MeBar"
				},
			])
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
