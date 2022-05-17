<template>
	<view class="fullScreen">
		<u-navbar title="商品列表" :is-back="true" :background="background">
			<view class="slot-wrap" @click="rightClick()">
			</view>
		</u-navbar>
	</view>
	
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	
	export default {
		setup() {
			const background = ref({
				backgroundColor: 'linear-gradient(45deg, rgb(76,200,24), rgb(212,198,119))',
			
				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',
			
				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(76,200,24), rgb(212,198,119))'
			})
			async function rightClick() {
			   await uni.navigateBack({})
			}
			return {
				background
			}
		},
		onLoad(val) {
			console.log(val)
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen{
		width: 100%;
		height: 100vh;
		background-color: #F2F4F7;
		position: relative;
	}

</style>
