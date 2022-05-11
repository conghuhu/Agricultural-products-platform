<template>
	<view>
		<u-navbar :title="title" :is-back="isBack" :background="background">
		</u-navbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	export default {
		props: {
			// 检测类型
			title: {
				type: String,
				default: "",
				required: true,
			},
			isBack: {
				type: Boolean,
				default: false,
			}
		},
		setup() {
			const background = ref({
				backgroundColor: '#001f3f',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			})
			return {
				background
			}
		}
	}
</script>

<style lang="scss">

</style>
