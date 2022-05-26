<template>
	<view class="fullScreen">
		<Nav title="我的购物车"></Nav>
		
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
	</view>


</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	export default {
		setup() {
			const list = reactive(navList)
			
			return {
				list,

			}
		},
		async onShow(){
			console.log(999)
		}
	}
</script>

<style lang="scss" scoped>
.fullScreen{
	height: 100vh;
	width: 100%;
	background-color: #F3F3F3;
	position: relative;
	font-size: 32rpx;
}
</style>
