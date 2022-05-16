<template>
	<view class="fullScreen">
		<Nav title="商品详情" :isBack="true"></Nav>
		<view class="content">

		</view>
	</view>

</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import request from '@/api/request';
	export default {
		setup() {
			const goodId = ref('');
			// 货物信息
			const goodInfo = reactive({
				adcode: "",
				expirationDate: "",
				firstCategoryId: "",
				firstCategoryName: "",
				goodName: "",
				goodPrice: "",
				imageShowList: [],
				location: {type: "", coordinates: []},
				mode: 1,
				originPlace: "",
				secondCategoryId: "",
				secondCategoryName: "",
				shopId: "",
				specification: "",
				status: true,
				unit: "",
				_id: ""
			})
			return {
				goodId,
				goodInfo
			}
		},
		async onLoad(option) {
			const goodIdRes = option.goodId;
			this.goodId = goodIdRes;
			const res = await request('goods', {
				type: 'getGoodById',
				goodId: goodIdRes
			})
			Object.assign(this.goodInfo,res.data);
			console.log(res);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		font-size: 32rpx;
		color: #333333;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 15px;
		}
	}
</style>
