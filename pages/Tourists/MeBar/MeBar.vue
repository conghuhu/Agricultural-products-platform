<template>
	<view class="fullScreen">
		<Nav title="我的信息"></Nav>
		<view class="head">
			<view class="info">
				<view class="info_image">
					<u-avatar size="120" src="https://cdn.uviewui.com/uview/common/classify/2/13.jpg"></u-avatar>
				</view>
				<view class="info_name">xiaowangtongxue</view>
			</view>
			<view class="message">
				<view class="message_left">
					<u-image width="100%" height="100%"  src="./static/images/message.png"></u-image>
				</view>
				<view class="message_right">
					<u-image width="100%" height="100%"  src="./static/images/setting.png"></u-image>
				</view>
			</view>
		</view>
		<view>
			<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	export default {
		setup() {
			const list = reactive(navList)
			const current = ref(0);
			return {
				list,
				current
			}
		}



	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		background-color: #F2F4F7;
		position: relative;
		.head{
			width: 100%;
			height: 10vh;
			background-color: #F2F4F7;
			display: flex;
			align-items: center;
			.info{
				flex: 7;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.info_image{
					flex: 1;
				}
				.info_name{
					flex: 2;
					display: flex;
					align-items: center;
					justify-content: left;
					font-size: 32rpx;
					font-weight: 600;
				}
			}
			.message{
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.message_left{
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
					
				}
				.message_right{
					width: 50rpx;
					height: 50rpx;
					margin-right: 26rpx;
				}
			}
		}
	}
</style>
