<template>
	<view class="fullScreen">
		<Nav title="商品详情" isBack="true" />
		<view class="content">
			<view class="good_card">
				<view class="good_card_top">
					<view style="font-size: 44rpx;font-weight: 550;">
						{{goodInfo.goodName}}
					</view>
					<view class="right">
						<view style="display: flex;align-items: center;justify-content: center;">
							<view style="font-weight: 550;margin-right: 10rpx;">
								{{goodInfo.goodPrice}}
							</view>
							元/{{goodInfo.unit}}
						</view>
						<view style="margin-left: 26rpx;margin-right: 20rpx;">
							<u-icon name="more-dot-fill"></u-icon>
						</view>
					</view>
				</view>
				<view class="good_card_content">
					<view class="item">
						产地:{{goodInfo.originPlace}}
					</view>
					<view class="item">
						规格:{{goodInfo.specification}}
					</view>
					<view class="item">
						有效期:{{goodInfo.expirationDate}}
					</view>
					<view class="item">
						支持:{{goodInfo.mode == 0 ? '自提':'配送'}}
					</view>
					<view class="item">
						类别:{{goodInfo.firstCategoryName}} - {{goodInfo.secondCategoryName}}
					</view>
				</view>
				<view class="good_card_Img">

				</view>
			</view>
			<view class="last_week_card">

			</view>
			<view class="last_month_card">

			</view>
			<view class="comments_card">

			</view>
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
			const goodInfo = reactive({
				expirationDate: "",
				firstCategoryName: "",
				goodName: "",
				goodPrice: NaN,
				imageShowList: [],
				mode: 1,
				originPlace: "",
				secondCategoryName: "",
				shopId: "",
				specification: "",
				unit: "",
				_id: ""
			});
			return {
				goodInfo
			}
		},
		async onLoad(option) {
			const res = await request('goods', {
				type: 'getGoodById',
				goodId: option.goodId
			});
			Object.assign(this.goodInfo, res.data);
			console.log(res);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		color: #333333;
		background-color: #E6E6E6;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			width: 100%;

			.good_card {
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				width: 100%;
				background-color: white;
				padding: 20rpx;

				.good_card_top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.right {
						display: flex;
						align-items: center;
						min-width: 100rpx;
					}
				}
				.good_card_content{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					margin-top: 16rpx;
					.item{
						margin-right: 20rpx;
						margin-bottom: 10rpx;
						color: #999999;
						font-size: 30rpx;
					}
				}
				
			}

			.last_week_card {
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				width: 100%;
				background-color: white;
				padding: 20rpx;
			}

			.last_month_card {
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				width: 100%;
				background-color: white;
				padding: 20rpx;
			}

			.comments_card {
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				width: 100%;
				background-color: white;
				padding: 20rpx;
			}
		}
	}
</style>
