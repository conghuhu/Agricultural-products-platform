<template>
	<view>
		<view>
			<u-navbar title="选择地址" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
				</view>

			</u-navbar>
		</view>
		<view>
			<u-search placeholder="请输入位置" v-model="keyword" @change="search()"></u-search>
		</view>
		<view>
			<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
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
			//tabbar
			const list = reactive(navList)
			//页面nav信息配置
			const current = ref(0);
			const background = ref({
				backgroundColor: '#001f3f',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			})
			async function rightClick() {
				console.log(11111)
				uni.reLaunch({
					url: "../HomeBar/HomeBar"
				})
			}
			const keyword = ref("")
			async function search() {
				await wx.startLocationUpdateBackground("gcj02")
				const {
					latitude,
					longitude
				} = await wx.getLocation();
				const res = await wx.choosePoi(2,latitude,longitude);
				console.log(res)
			}
			return {
				list,
				current,
				background,
				rightClick,
				keyword,
				search
			}
		}



	}
</script>

<style>
	.u-status-bar.data-v-98bbdc6a {
		height: 0;
	}
</style>
