<template>
	<view class="fullScreen">
		<Nav :title="title" isBack />
		<GoodList :flowList="goodList" :goodListLoading="goodListLoading" />
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
			const goodListLoading = ref(true);
			const goodList = reactive([]);
			const title = ref('商品列表');
			async function rightClick() {
				await uni.navigateBack({})
			}
			return {
				goodList,
				goodListLoading,
				title
			}
		},
		async onLoad(val) {
			this.title = val.name;
			const res = await request('goods', {
				type: 'getGoodsByScdCategoryId',
				secondCategoryId: val.id
			});
			this.goodList.length = 0;
			res.data.forEach(item => {
				this.goodList.push(item);
			});
			this.goodListLoading = false;
			console.log(res);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

	}
</style>
