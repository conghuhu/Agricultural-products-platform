<template>
	<u-navbar :title="title" :is-back="isBack" :background="background" :borderBottom="false" titleBold>
		<slot></slot>
	</u-navbar>
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
				// 还可以设置背景图size属性
				backgroundSize: 'cover',
				// 渐变色
				backgroundImage: 'linear-gradient(#dff7e1 2%,#ecf7f1 30%,#f0f6f6 60%, #F3F3F3 98%, #F3F3F3 98%)'
			})
			return {
				background
			}
		}
	}
</script>

<style lang="scss">

</style>
