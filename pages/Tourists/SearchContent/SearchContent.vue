<template>
	<view class="fullScreen">
		<Nav title="查询结果" :isBack="true"></Nav>
		<view class="content">

		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	export default {
		setup() {
			const keywords = reactive([]);

			return {
				keywords
			}
		},
		async onLoad(option) {
			console.log(option.keyword);
			this.keywords.length = 0;
			try {
				const res = await wx.serviceMarket.invokeService({
					service: 'wxcae50ba710ca29d3', // 'wx_mp_appid',
					api: 'goodinfo',
					data: {
						"q": option.keyword, //需要进行商品关键词识别的语句
					},
				});
				console.log('invokeService success', res)
				res.data.entities.product.forEach(item => {
					this.keywords.push([item[0],item[1]]);
				});
				console.log(this.keywords);
			} catch (e) {
				console.trace(e);
			}

		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: $background-color;
		}
	}
</style>
