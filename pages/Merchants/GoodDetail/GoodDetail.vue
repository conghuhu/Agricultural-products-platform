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
						<view style="margin-left: 26rpx;margin-right: 20rpx;" @click="actionSheetShow = true">
							<u-icon name="more-dot-fill"></u-icon>
						</view>
						<u-action-sheet @click="clickAction" :list="actionList" v-model="actionSheetShow">
						</u-action-sheet>
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
					<u-upload :fileList="goodInfo.imageShowList.map(item=>{return{
						url:item
					} })" :maxCount="goodInfo.imageShowList.length" :deletable="false"></u-upload>
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
			const userId = ref('');
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
			const actionSheetShow = ref(false);
			const actionList = reactive([{
				text: '编辑商品',
			}, {
				text: '下架',
				color: 'red',
			}])
			/**
			 * 操作分发
			 */
			const clickAction = (index) => {
				if (index == 0) {

				} else {
					uni.showModal({
						title: "确定要下架该商品吗？",
						success: async function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								const db = wx.cloud.database();
								const _ = db.command;

								const res = await db.collection('goods').where({
									_id: _.eq(goodInfo._id),
									_openid: _.eq(userId.value)
								}).update({
									data: {
										status: false,
										unit: '两'
									}
								})
								console.log(res);
								uni.showToast({
									title: '下架成功'
								})
								setTimeout(() => {
									uni.navigateBack();
								}, 1000);
							}
						}
					})
				}
			}

			return {
				goodInfo,
				actionSheetShow,
				actionList,
				clickAction,
				userId
			}
		},
		async onLoad(option) {
			const res = await request('goods', {
				type: 'getGoodById',
				goodId: option.goodId
			});
			Object.assign(this.goodInfo, res.data);

		},
		async onReady() {
			const res = await wx.getStorage({
				key: 'userInfo',
				encrypt: true,
			});
			this.userId = res.data.openid;
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

				.good_card_content {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					margin-top: 16rpx;

					.item {
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
