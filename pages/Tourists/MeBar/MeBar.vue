<template>
	<view class="fullScreen">
		<!-- <Nav title="我的信息"></Nav> -->

		<view class="content">
			<view class="top_back">
			</view>
			<view class="head">
				<view class="avatar_container">
					<view class="avatar" />
				</view>
				<view class="content">
					<view class="nickname">
						{{userInfo.nickName}}
					</view>
				</view>
			</view>
			<view class="cantainer">
				<view class="item">
					<view class="icon">
						<u-image width="64rpx" mode="aspectFit" height="64rpx"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E9%92%B1%E5%8C%85.png?sign=6c67c0e7ae28c504dbf7d9dab5a934ff&t=1653970375">
						</u-image>
					</view>
					<view class="right">
						<view class="consumer">
							本月消费: ￥2230
						</view>
						<view class="total">
							余额：￥{{money}}
						</view>
					</view>
				</view>

				<view class="item">
					<view class="icon">
						<u-image width="64rpx" mode="aspectFit" height="64rpx"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E8%AE%A2%E5%8D%95.png?sign=1322d50c5a637574e1e5f562d0107050&t=1653974604">
						</u-image>
					</view>
					<view class="right_item">
						<view class="item_combine" v-for="(item,index) in orderList" :key="index"
							@click="gotoOrder(item.url,index)">
							<u-image width="50rpx" mode="aspectFit" height="50rpx" :src="item.icon">
							</u-image>
							<view class="text">
								{{item.text}}
							</view>
						</view>
					</view>
				</view>

				<view class="item">
					<view class="icon">
						<u-image width="64rpx" mode="aspectFit" height="64rpx"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%B7%A5%E5%85%B7.png?sign=eeeac7ea99096dc449d42ac6471f18ec&t=1653974631">
						</u-image>
					</view>
					<view class="right_item">
						<view class="item_combine" v-for="(item,index) in toolList" :key="index">
							<u-image @click="gotoPage(item)" width="50rpx" mode="aspectFit" height="50rpx"
								:src="item.icon">
							</u-image>
							<view class="text">
								{{item.text}}
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<u-tabbar :list="list" :mid-button="true"></u-tabbar>

	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import request from '@/api/request';
	import navList from '@/pages/Tourists/utils/navList';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	export default {
		setup() {
			const user = userStore();
			const {
				userInfo
			} = storeToRefs(user);
			const list = reactive(navList);
			const money = ref(0);
			// 订单菜单
			const orderList = reactive([{
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%BE%85%E5%AE%8C%E6%88%90.png?sign=746d960471d02df9efbc111f2ce19e21&t=1653972109',
				text: '待支付',
				url: "/pages/Tourists/Order/Order"
			}, {
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E8%BF%9B%E8%A1%8C%E4%B8%AD.png?sign=a65bd977bb15616d00af63ac7571e698&t=1653974111',
				text: '进行中',
				url: "/pages/Tourists/Order/Order"
			}, {
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%B7%B2%E5%AE%8C%E6%88%90.png?sign=c2f487d81efb16d2d9144f6e18eefe96&t=1653974124',
				text: '已完成',
				url: "/pages/Tourists/Order/Order"
			}]);
			// 工具菜单
			const toolList = reactive([{
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%85%B3%E6%B3%A8.png?sign=823e5e8f340f6cf004b527befa4b0b86&t=1653974741',
				text: '关注店铺'
			}, {
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%9C%B0%E5%9D%80.png?sign=cec3bc5ea67c8dec43c79dabb404e261&t=1653982220',
				text: '收获地址',
				url: '/pages/Tourists/Location/Location'
			}, {
				icon: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E5%AE%A2%E6%9C%8D.png?sign=e3c73806b4be9918334f5284c48ca9ae&t=1653982332',
				text: '官方客服'
			}]);

			const gotoOrder = (url: string, index: number) => {
				console.log(index);
				uni.navigateTo({
					url: url
				})
			}
			const gotoPage = async (item) => {
				console.log(item);
				uni.navigateTo({
					url: item.url
				})
			};
			return {
				list,
				userInfo,
				orderList,
				toolList,
				money,
				gotoPage,
				gotoOrder
			}
		},
		async onShow() {
			const res = await request('user', {
				type: 'getMoneyBalance'
			});
			this.money = res.data || 0;
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F3F3F3;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: #F3F3F3;

			.top_back {
				width: 100%;
				height: 30vh;
				background-image: url('https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/Mask.png?sign=e8dfa044bfc47b36aa3ed2ae25f3899b&t=1653962723');
				background-size: cover;
				background-repeat: no-repeat;
				position: relative;
				z-index: 0;
			}

			.head {
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 150rpx;
				z-index: 99;

				.avatar_container {
					flex: 1;
					display: flex;
					justify-content: center;
					z-index: 98;

					.avatar {
						width: 36vw;
						height: 36vw;
						border-radius: 50%;
						border: 15rpx solid white;
						background-image: url('https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/shopAvatar.jpg?sign=86737ed47c27d68c83cba096cbd8aaaa&t=1652501346');
						background-size: cover;
						background-repeat: no-repeat;
						overflow: visible;
						z-index: 98;
						transform: translateY(-75rpx);
					}
				}


				.content {
					font-family: SourceHanSansCN-Bold;
					letter-spacing: 0px;
					color: #4A4A4A;
					font-weight: bold;
					flex: 1;
					font-size: 40rpx;
					line-height: 40rpx;
					height: 150rpx;

					.nickname {
						margin-top: 20rpx;
					}
				}
			}


			.cantainer {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 30rpx;

				.item {
					width: 100%;
					height: 140rpx;
					border-radius: 30rpx;
					background: #EEEEEE;
					box-shadow: 0px 20rpx 30rpx 0px rgba(10, 31, 68, 0.12);
					transform: translateX(120rpx);
					margin-bottom: 60rpx;

					.icon {
						box-sizing: border-box;
						border: 1px solid #77D4A6;
						background: #FFFFFF;
						width: 140rpx;
						height: 140rpx;
						border-radius: 50%;
						float: left;
						transform: translateX(-66rpx);

						display: flex;
						justify-content: center;
						align-items: center;
					}

					.right {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						transform: translateX(-42rpx);
						height: 100%;

						.consumer {
							margin-right: 40rpx;
						}
					}

					.right_item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						height: 100%;
						transform: translateX(-16rpx);

						.item_combine {
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction: column;
							margin-right: 36rpx;
							width: 120rpx;

							.text {
								margin-top: 10rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 30rpx;
								letter-spacing: 0rpx;
								color: #000000;
							}
						}
					}
				}
			}
		}

	}
</style>
