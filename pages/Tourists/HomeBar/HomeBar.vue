<template>
	<view class="fullScreen">
		<view>
			<u-navbar title="主页" :is-back="false" :background="background">
				<view class="myLocation" @click="rightClick"> 当前位置</view>
			</u-navbar>
		</view>
		<view>
			<u-search placeholder="点击查找商品" placeholder-color="#333333" :show-action="true" action-text="搜索"
				:animation="true" shape="square" bg-color="#F9FAFB" input-align="center"></u-search>
		</view>
		<view class="today">
			<text class="today_text">今日精选活动</text>
		</view>
		<scroll-view class="scroll_view_card" scroll-x="true" scroll-y="false">
			<view class="inline_card_contain" v-for="(item,index) in viewList" :key="index">
				<view class="swiper_card">
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
			<u-grid :col="4" >
				<u-grid-item class="grid_item" v-for="(item,index) in categoryList" :key="index">
					<view>
						<u-image borderRadius="8rpx" height="60rpx" width="60rpx" mode="aspectFill"
							src="/static/images/2562.png"></u-image>
					</view>
					<view class="grid_text">{{item.name}}</view>
				</u-grid-item>
			</u-grid>
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
	export default {
		setup() {
			const list = reactive(navList)
			const current = ref(0);
			const background = ref({
				backgroundColor: '#001f3f',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			})
			const viewList = ref([{
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


			])
			//接受类别数组
			const categoryList = reactive([]);
			async function rightClick() {
				console.log(11111)
				uni.navigateTo({
					url: "../Location/Location"
				})
			}
			return {
				list,
				current,
				background,
				rightClick,
				viewList,
				categoryList
			}
		},
	    async onLoad(){
			const temp:{res:Array<any>} = await request("goods",{
				type:"getFirstCategory"
			})
			console.log(temp)
			temp.data.forEach(item=>{
				this.categoryList.push(item);
			})
		}



	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;

		.myLocation {
			margin-left: 10rpx;
			font-size: 32rpx;
			font-family: SourceHanSansCN-ExtraLight;
			line-height: 11rpx;
			color: rgba(0, 0, 0, 0.8);
			font-weight: 250;
		}

		.serach_view {
			border-radius: 4px;
			background: #F9FAFB;
		}

		.today {
			margin-left: 20rpx;
			margin-top: 10rpx;
			width: 132px;
			height: 22px;

			.today_text {
				font-family: SourceHanSansCN-Bold;
				font-size: 22px;
				font-weight: bold;
				line-height: 22px;
				letter-spacing: 0px;
				color: rgba(0, 0, 0, 0.8);
			}
		}

		.scroll_view_card {
			white-space: nowrap;
			width: 100%;

			.inline_card_contain {
				display: inline-block;

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
