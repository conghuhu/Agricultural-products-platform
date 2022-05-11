<template>
	<view>
		<view>
			<u-navbar title="当前位置" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
					获取当前位置
				</view>
			</u-navbar>
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
				uni.redirectTo({
					url:"../Location/Location"
				})
			}
			return {
				list,
				current,
				background,
				rightClick
			}
		}



	}
</script>

<style>
	.u-status-bar.data-v-98bbdc6a {
		height: 0;
	}
</style>
