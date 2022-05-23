<template>
	<view class="fullScreen">
		<view>
			<u-navbar title="主页" :is-back="false" :background="background">
				<view class="location_group">
					<image style="width: 36rpx;height: 36rpx;"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location_dark.png?sign=2a3ccd9da9a8421970c36a1be72c67a6&t=1653268420"
						mode="aspectFit"></image>
					<view class="myLocation" @click="rightClick">
						<Ellipsis :width="250" :content="currentLocationVal" />
					</view>
				</view>

			</u-navbar>
		</view>
		<view class="search_contain">
			<view class="search">
				<view class="text">
					点击查找商品
				</view>
				<view class="icon">
					<u-image height="40rpx" width="40rpx" mode="aspectFill"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/%E6%90%9C%E7%B4%A2.png?sign=abd2bc7f5c541794394684b2a582ac8b&t=1652688817" />
				</view>
			</view>
		</view>
		<view class="today">
			<text class="today_text">今日精选商品</text>
		</view>
		<scroll-view class="scroll_view_card" scroll-x="true" scroll-y="false">
			<view class="inline_card_contain" v-for="(item,index) in viewList" :key="index">
				<view class="swiper_card" @click="gotoGoodDetail(item)">
					<view class="card_top">
						<u-image borderRadius="16rpx" height="100%" width="100%" mode="aspectFill" :src="item.image">
						</u-image>
					</view>
					<view class="card_bottom">
						<view class="bottom_left">
							<view class="left_title">{{item.title}}</view>
							<view class="left_location">{{item.loacation}}</view>
						</view>
						<view class="bottom_right">
							<view class="right_left">{{item.leftMoney}}</view>
							<view class="right_right">{{item.rightMoney}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="today">
			<text class="today_text">商品分类展示</text>
		</view>
		<view class="grid_full">
			<u-grid :col="4">
				<u-grid-item class="grid_item" bgColor="#F2F4F7" v-for="(item,index) in categoryList" :key="index">
					<view @click="toClassification(index)">
						<u-image borderRadius="8rpx" height="60rpx" width="60rpx" mode="aspectFill" :src="item.icon">
						</u-image>
					</view>
					<view class="grid_text">{{item.name}}</view>
				</u-grid-item>
			</u-grid>
		</view>

		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="10" border-radius="10" :image="item.imageShowList[0]" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.goodName}}
						</view>
						<view class="demo-price">
							{{item.goodPrice}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.originPlace}}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.imageShowList[0]" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.goodName}}
						</view>
						<view class="demo-price">
							{{item.goodPrice}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.originPlace}}
						</view>
					</view>
				</template>
			</u-waterfall>

		</view>
		<view>
			<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	export default {
		setup() {
			const list = reactive(navList);
			const current = ref(0);
			const background = ref({
				// 渐变色
				backgroundImage: 'linear-gradient(100deg, #4CC818 2%, #4CC818 2%, #b0d479 98%, #b0d479 98%)'
			});
			const user = userStore();
			const {
				currentLocationVal
			} = storeToRefs(user);
			const viewList = reactive([{
					image: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/3.png?sign=8f729fbad4e530b1ca32a3156e633933&t=1652588964',
					title: '红富士苹果',
					loacation: '山东烟台',
					leftMoney: '1.5',
					rightMoney: '元/斤',
				},
				{
					image: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/4.png?sign=b3ad85d61434ba95a03bcd72677120de&t=1652589100',
					title: '黄金帅苹果',
					loacation: '山东烟台',
					leftMoney: '1.5',
					rightMoney: '元/斤',
				},
				{
					image: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/3.png?sign=8f729fbad4e530b1ca32a3156e633933&t=1652588964',
					title: '红富士苹果',
					loacation: '山东烟台',
					leftMoney: '1.5',
					rightMoney: '元/斤',
				},
				{
					image: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/5.png?sign=31597cacca38c47a14a3986214b61362&t=1652589130',
					title: '特惠橘子',
					loacation: '山东烟台',
					leftMoney: '2.5',
					rightMoney: '元/斤',
				},
				{
					image: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/7.png?sign=6445c6d38be5307e951001e407be784a&t=1652589176',
					title: '特惠大西瓜',
					loacation: '山东临沂',
					leftMoney: '2.5',
					rightMoney: '元/斤',
				},
			]);
			/**
			 * 定义瀑布流信息
			 */
			const flowList = reactive([]);
			/**
			 * 获取商品信息
			 */
			async function getGoodsList() {
				const {
					latitude,
					longitude
				} = await wx.getLocation();
				const ans = await Promise.all([request("goods", {
					type: "getGoodsByLocation",
					latitude: latitude,
					longitude: longitude,
				}), wx.serviceMarket.invokeService({
					service: 'wxc1c68623b7bdea7b',
					api: 'rgeoc',
					data: {
						"location": latitude + "," + longitude
					},
				})]);
				// 更新store中的位置信息
				user.updateLocationInfo(ans[1].data.result.formatted_addresses.recommend, latitude, longitude);
				ans[0].data.forEach((item, index) => {
					flowList.push(item);
				});
				console.log(flowList)
			};
			//接受类别数组
			const categoryList = reactive([]);
			/**
			 * 跳转至地址界面
			 */
			function rightClick() {
				uni.navigateTo({
					url: "../Location/Location"
				})
			}
			/**
			 * 跳转至该商品详情页
			 */
			const gotoGoodDetail = (item) => {
				const goodId = "b69f67c06281bcfa02f3ffff249f0611";
				uni.navigateTo({
					url: `/pages/Tourists/GoodDetail/GoodDetail?goodId=${goodId}`
				})
			}

			const toClassification = async function(index) {
				uni.redirectTo({
					url: "../ClassificationBar/ClassificationBar?id=" + JSON.stringify(index)
				})
			}
			return {
				list,
				current,
				background,
				rightClick,
				viewList,
				categoryList,
				gotoGoodDetail,
				flowList,
				getGoodsList,
				toClassification,
				currentLocationVal
			}
		},
		async onLoad() {
			this.getGoodsList();
			const temp: {
				res: Array < any >
			} = await request("goods", {
				type: "getFirstCategory"
			})
			temp.data.forEach(item => {
				this.categoryList.push(item);
			})
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F2F4F7;
		position: relative;

		.location_group {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 26rpx;
		}

		.wrap {
			background-color: #F2F4F7;
			width: 100%;
		}

		.demo-warter {
			border-radius: 8px;
			margin: 2px;
			background-color: #F2F4F7;
			padding: 8px;
			position: relative;
		}

		.u-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
		}

		.demo-image {
			width: 100%;
			border-radius: 4px;
		}

		.demo-title {
			font-size: 30rpx;
			margin-top: 5px;
			color: $u-main-color;
		}

		.demo-tag {
			display: flex;
			margin-top: 5px;
		}

		.demo-tag-owner {
			background-color: $u-type-error;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 4rpx 14rpx;
			border-radius: 50rpx;
			font-size: 20rpx;
			line-height: 1;
		}

		.demo-tag-text {
			border: 1px solid $u-type-primary;
			color: $u-type-primary;
			margin-left: 10px;
			border-radius: 50rpx;
			line-height: 1;
			padding: 4rpx 14rpx;
			display: flex;
			align-items: center;
			border-radius: 50rpx;
			font-size: 20rpx;
		}

		.demo-price {
			font-size: 30rpx;
			color: $u-type-error;
			margin-top: 5px;
		}

		.demo-shop {
			font-size: 22rpx;
			color: $u-tips-color;
			margin-top: 5px;
		}

		.search_contain {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 20rpx;

			.search {
				width: 80vw;
				height: 13vw;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10rpx;
				border-radius: 4px;
				background: #F9FAFB;
				box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);
				padding-left: 20rpx;
				padding-right: 20rpx;

				.text {
					font-family: SourceHanSansCN-ExtraLight;
					font-size: 26rpx;
					font-weight: 250;
					line-height: 26rpx;
					letter-spacing: 0px;
					color: #333333;
				}
			}
		}

		.myLocation {
			margin-left: 10rpx;
			font-size: 32rpx;
			font-family: SourceHanSansCN-ExtraLight;
			color: rgba(0, 0, 0, 0.8);
			font-weight: 500;
			text-align: center;
			line-height: 35rpx;
		}

		.serach_view {
			border-radius: 4px;
			background: #F9FAFB;
		}

		.today {
			padding: 32rpx;
			padding-bottom: 20rpx;
			padding-top: 20rpx;


			.today_text {
				font-family: SourceHanSansCN-Bold;
				font-size: 44rpx;
				font-weight: bold;
				line-height: 44rpx;
				letter-spacing: 0rpx;
				color: rgba(0, 0, 0, 0.8);
			}
		}

		.scroll_view_card {
			white-space: nowrap;
			width: 100%;

			.inline_card_contain {
				display: inline-block;
				padding-top: 20rpx;
				padding-bottom: 30rpx;

				margin-left: 20rpx;
				margin-right: 20rpx;

				.swiper_card {
					width: 70vw;
					height: 55vw;
					background: #F9FAFB;
					border-radius: 20rpx;
					border: 0;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: space-around;
					padding: 16rpx;
					box-shadow: 0rpx 14rpx 14rpx 0rpx #cecece;

					.card_top {
						width: 100%;
						flex: 2;
					}

					.card_bottom {
						display: flex;
						justify-content: space-around;
						align-items: center;
						width: 100%;
						flex: 1;

						.bottom_left {
							margin-top: 35rpx;
							display: flex;
							flex-direction: column;
							flex: 2;

							.left_title {
								font-size: 15px;
								color: black;
								font-weight: 250;
								margin-bottom: 10rpx;
								font-family: SourceHanSansCN-ExtraLight;
								color: rgba(0, 0, 0, 0.8);
							}

							.left_location {
								font-size: 28rpx;
								font-weight: 250;
								font-family: SourceHanSansCN-ExtraLight;
								line-height: 11px;

							}
						}

						.bottom_right {
							margin-top: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							flex: 1;

							.right_left {
								font-size: 40rpx;
								font-weight: 700;
							}

							.right_right {
								font-size: 28rpx;
							}

						}
					}
				}
			}
		}

		.grid_full {
			width: 100%;
			height: 50vw;
			margin-bottom: 30rpx;

			.grid_item {

				.grid_images {
					// position: absolute;
					// top: 14rpx;
					// right: 40rpx;
					// width: 100rpx;
					// height: 100rpx;

				}

			}
		}

		.u-status-bar.data-v-98bbdc6a {
			height: 0;
		}

		.wrap {
			padding: 40rpx;
		}

		.badge-icon {
			position: absolute;
			top: 14rpx;
			right: 40rpx;
			width: 80rpx;
			height: 80rpx;
		}

		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}
	}
</style>
