<template>
	<view class="fullScreen">
		<Nav :title="title" :isBack="true"></Nav>
		<view class="content">
			<GoodList :flowList="goodList" :goodListLoading="goodListLoading" />
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import request from '@/api/request';
	export default {
		setup() {
			const keywords = reactive([]);
			const goodList = reactive([]);
			const goodListLoading = ref(true);
			const title = ref('查询结果');

			return {
				keywords,
				goodList,
				goodListLoading,
				title
			}
		},
		async onLoad(option) {
			this.title = option.keyword;
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
				if (res.data.entities.product) {
					res.data.entities.product.forEach(item => {
						this.keywords.push([item[0], item[1]]);
					});
				} else {
					this.keywords.push([option.keyword, 'name']);
				}

				let keyword = "";
				for (let i = 0; i < this.keywords.length; i++) {
					const item = this.keywords[i];
					if (item[1] == "name") {
						keyword = item[0];
						break;
					}
				}
				// 如果nlp接口无值，直接取用户输入的东西
				if (keyword == '' || keyword == null) {
					keyword = res.data.preprocessed_text;
				}
				const {
					data: list
				} = await request('goods', {
					type: 'getGoodsByKeyword',
					keyword: keyword,
					priceOrder: 'asc'
				})
				request('recommend', {
					type: 'addHotWord',
					keyword: keyword,
				});
				if (list) {
					this.goodList.length = 0;
					list.forEach(item => {
						this.goodList.push(item);
					});
				}
				this.goodListLoading = false;
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
