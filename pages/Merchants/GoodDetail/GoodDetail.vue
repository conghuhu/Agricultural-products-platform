<template>
	<view class="fullScreen">
		<Nav title="商品详情" isBack="true" />
		<view class="content">
			<view style="width: 100%;justify-content: center;align-items: center;height: 70vh;" v-if="loading">
				<MyLoading />
			</view>

			<block v-else>
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
							<view style="padding-left: 26rpx;padding-right: 20rpx;" @click="actionSheetShow = true">
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
						<view class="item">
							上架日期:{{goodInfo.createTime}}
						</view>
					</view>
					<view class="good_card_Img">
						<u-upload :fileList="goodInfo.imageShowList.map(item=>{return{
							url:item
						} })" :maxCount="goodInfo.imageShowList.length" :deletable="false"></u-upload>
					</view>
				</view>
				<view class="last_week_card">
					<view class="good_card_top">
						<view style="font-size: 44rpx;font-weight: 550;margin-bottom: 20rpx;">
							近一周销量统计图
						</view>
					</view>
					<qiun-data-charts type="line" :ontouch="true" :opts="chartOption" :chartData="option" />
				</view>
				<view class="last_month_card">
					<view class="good_card_top">
						<view style="font-size: 44rpx;font-weight: 550;margin-bottom: 20rpx;">
							近一个月销量统计图
						</view>
					</view>
					<qiun-data-charts type="line" :ontouch="true" :opts="chartOption" :chartData="optionMonth" />
				</view>
				<view class="comments_card">

				</view>
			</block>


		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed,
		inject,
		onMounted
	} from 'vue';
	import request from '@/api/request';
	import dayjs from 'dayjs';

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
				_id: "",
				createTime: null,
				updateTime: null
			});
			const goodSaleInfo = reactive([]);
			const goodMonthSaleInfo = reactive([]);
			const timeList = reactive([]);
			const numList = reactive([]);
			const actionSheetShow = ref(false);
			const actionList = reactive([{
				text: '编辑商品',
			}, {
				text: '下架',
				color: 'red',
			}]);

			const loading = ref(true);

			const chartOption = reactive({
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					"#ea7ccc"
				],
				padding: [15, 10, 0, 15],
				enableScroll: true,
				legend: {},
				xAxis: {
					disableGrid: true,
					scrollShow: true,
					itemCount: 4
				},
				yAxis: {
					gridType: "dash",
					dashLength: 2
				},
				extra: {
					line: {
						type: "straight",
						width: 2
					}
				}
			});

			/**
			 * chart数据
			 */
			const option = reactive({
				categories: timeList,
				series: [{
					name: "销量",
					data: numList
				}],
			});

			/**
			 * chartMonth数据
			 */
			const optionMonth = reactive({
				categories: ['前一周', '前二周', '前三周', '前四周'],
				series: [{
					name: "销量",
					data: goodMonthSaleInfo
				}],
			});
			/**
			 * 刷新数据
			 */
			const refreshData = async (goodId) => {
				const res = await request('goods', {
					type: 'getGoodById',
					goodId: goodId
				});
				Object.assign(goodInfo, res.data);
				goodInfo.createTime = dayjs(res.data.createTime).format(
					'YYYY-MM-DD HH:mm:ss');
				goodInfo.updateTime = dayjs(res.data.updateTime).format(
					'YYYY-MM-DD HH:mm:ss');
			}
			/**
			 * 获取商品销量数据
			 */
			const getSaleData = async (goodId) => {
				const res = await request('sale', {
					type: 'querySale',
					goodId: goodId
				});
				Object.assign(goodSaleInfo, res.data);
				console.log(res);
				for (let i = 0; i < res.data.length; i++) {
					const time = res.data[i][0];
					const arr = time.split("-");
					timeList.push(arr[1] + "-" + arr[2]);
					numList.push(res.data[i][1]);
				}

			}

			/**
			 * 获取商品月销量数据
			 */
			const getMonthSaleData = async (goodId) => {
				const res = await request('sale', {
					type: 'querySaleMonth',
					goodId: goodId
				});

				console.log(res);
				for (let i = 0; i < res.data.length; i++) {
					goodMonthSaleInfo.push(res.data[i]);
				}
				console.log(goodMonthSaleInfo);

			}
			/**
			 * 操作分发
			 */
			const clickAction = (index) => {
				if (index == 0) {
					uni.navigateTo({
						url: `/pages/Merchants/EditGoodDetail/EditGoodDetail?goodId=${goodInfo._id}`,
						events: {
							refresh: async function(e) {
								refreshData(goodInfo._id);
							}
						}
					})
				} else {
					uni.showModal({
						title: "确定要下架该商品吗？",
						success: async function(res) {
							if (res.confirm) {

								try {
									const res = await request('goods', {
										type: 'downGood',
										goodId: goodInfo._id
									});

									if (res.errMsg === "document.update:ok") {
										uni.showToast({
											title: '下架成功'
										});
									} else {
										throw new Error(res.errMsg);
									}
								} catch (e) {
									console.trace(e);
									uni.showToast({
										title: '下架失败'
									});
								}
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
				refreshData,
				getSaleData,
				getMonthSaleData,
				option,
				chartOption,
				loading,
				optionMonth
			}
		},
		async onLoad(option) {
			await this.refreshData(option.goodId);
			await this.getSaleData(option.goodId);
			await this.getMonthSaleData(option.goodId);
			this.loading = false;
		},
		async onReady() {

		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		color: #333333;
		background-color: $background-color;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			width: 100%;
			background-color: $background-color;

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
						color: $u-content-color;
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
				min-height: 300rpx;
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
