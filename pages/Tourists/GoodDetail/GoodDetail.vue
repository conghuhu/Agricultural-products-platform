<template>
	<view class="fullScreen">
		<NavTransparent />
		<view class="content">
			<view class="wrap">
				<u-swiper height="450" :border-radius="0" :list="goodInfo.imageShowList"></u-swiper>
			</view>
			<view class="card">
				<view class="card_top">
					<view class="top_left">
						<view class="left_top">{{goodInfo.goodName}}</view>
						<view class="left_mid">{{goodInfo.description}}</view>
					</view>
					<view class="top_right">
						<view class="right_top">
							<view class="top_number">{{goodInfo.goodPrice}}</view>
							<view class="top_content">元/{{goodInfo.unit}}</view>
						</view>
					</view>
				</view>
				<view class="card_mid">
					<u-line color="#bababa" />
				</view>
				<view class="card_bottom">
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="40" mode="aspectFit" src="./static/images/peisongTime.png">
							</u-image>
						</view>
						<view class="left_content">
							<view class="content_top">2天</view>
							<view class="content_bottom">配送时间</view>
						</view>
					</view>
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="40" mode="aspectFit" src="./static/images/fahuoAddress.png">
							</u-image>
						</view>
						<view class="left_content">
							<view class="content_top">
								<Ellipsis :content="goodInfo.originPlace" :width="160" />
							</view>
							<view class="content_bottom">产地</view>
						</view>
					</view>
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="40" mode="aspectFit" src="./static/images/peisongStyle.png">
							</u-image>
						</view>
						<view class="left_content">
							<view class="content_top">
								<Ellipsis :content="goodInfo.mode == 1 ? '即时配送':'顺丰物流'" :width="160" />
							</view>
							<view class="content_bottom">配送方式</view>
						</view>
					</view>
				</view>
			</view>

			<view class="body">
				<view style="margin-bottom: 16rpx;margin-top: 6rpx;">
					<u-tabs activeColor="#4CC818" :showBar="false" :list="tabList" :is-scroll="false"
						v-model="currentTab" @change="changeTab" :clickChange="true" />
				</view>
				<view class="body_content" v-if="currentTab == 0">
					<view class="comment_card" v-for="(item,index) in comments">
						<view class="user_card">
							<view class="user_touxiang">
								<u-image width="100%" shape="circle" height="80rpx" mode="heightFix" :src="item.userInfo.avatarUrl">
								</u-image>
							</view>
							<view class="user_info">
								<view class="user_name">{{item.userInfo.nickName}}</view>

							</view>
							<view class="user_xingxing">
								<u-rate active-color="#ffaa00" :count="5" size="28" gutter="10"
									v-model="item.startCount"></u-rate> 
							</view>
						</view>
						<view class="mid">
							<view class="time">{{dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
							<view class="tag" >
								<view class="tagContent"  v-for="data in item.tagContent">
									<u-tag :text="data" shape="circle" type="info" />
								</view>
							</view>
							
						</view>
						<view class="pinglun_content">
							{{item.content}}
						</view>
						<view class="pinglun_image">
							<view class="image_info" v-for="image in item.imageList">
								<u-image width="100%" height="70px" :src="image">
								</u-image>
							</view>
						</view>
						<view v-if="index!=countLine">
							<u-line color="#606266" />
						</view>
						<view v-else></view>
						
					</view>
				</view>

				<view class="body_content" v-else-if="currentTab == 1">
					<GoodDescription :goodInfo="goodInfo" />
				</view>
			</view>
		</view>

		<view class="bottom_info">
			<view class="info_left">
				<view class="item" @click="gotoShop">
					<u-image width="100%" mode="aspectFit" height="50rpx" src="./static/images/dianpu.png">
					</u-image>
				</view>
				<view class="item" @click="tokefu">
					<u-image width="100%" mode="aspectFit" height="50rpx" src="./static/images/kefu.png"></u-image>
				</view>
				<view class="item" @click="gotoShoppingBar">
					<u-image width="100%" mode="aspectFit" height="50rpx" src="./static/images/shoppingCart.png">
					</u-image>
					<u-badge type="error" :count="navList[3].count" :isCenter="true"></u-badge>
				</view>
			</view>
			<view class="info_right">
				<u-button shape="circle" type="success" @click="addToWant">+ 加入购物车</u-button>
			</view>
		</view>
	</view>

</template>
<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	import navList from '@/pages/Tourists/utils/navList';
	import dayjs from 'dayjs';
	export default {
		setup() {
			const countLine = ref(0);
			const comments = reactive([]);
			const user = userStore();
			const {
				wantingGoods
			} = storeToRefs(user);
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
				location: {
					type: "",
					coordinates: []
				},
				mode: 1,
				originPlace: "",
				secondCategoryId: "",
				secondCategoryName: "",
				shopId: "",
				specification: "",
				status: true,
				unit: "",
				_id: "",
				description: "",
				_openid: ""
			});

			const currentTab = ref(0);

			const count = computed(() => {
				const exist = wantingGoods.value.has(goodInfo._id);
				if (exist) {
					return wantingGoods.value.get(goodInfo._id);
				} else {
					return 0;
				}
			});
			const tokefu = async function() {
				uni.navigateTo({
					url: `/pages/Tourists/ChatRoom/ChatRoom?m_openId=${goodInfo._openid}`
				})
			}
			/**
			 * 添加想要
			 */
			const addToWant = async (e) => {
				user.incrementWantedGood(goodInfo._id);
				const res = await request('wanted', {
					type: 'addWanted',
					goodId: goodInfo._id,
					count: count.value
				});
			};


			const gotoShop = () => {
				uni.navigateTo({
					url: `/pages/Tourists/ShopHome/ShopHome?shopId=${goodInfo.shopId}`
				})
			};

			const gotoShoppingBar = () => {
				uni.switchTab({
					url: '/pages/Tourists/ShoppingBar/ShoppingBar'
				})
			};

			const tabList = reactive([{
				name: '评价'
			}, {
				name: '规格参数'
			}]);

			const changeTab = (index) => {
				console.log(index);
			}

			return {
				goodId,
				goodInfo,
				tokefu,
				addToWant,
				navList,
				gotoShoppingBar,
				gotoShop,
				tabList,
				currentTab,
				changeTab,
				comments,
				dayjs,
				countLine
			}
		},
		async onLoad(option) {
			const goodIdRes = option.goodId;
			this.goodId = goodIdRes;
			const res = await request('goods', {
				type: 'getGoodById',
				goodId: goodIdRes
			})
			const temp:{data:Array<any>} = await request('comments', {
				type: "getGoodsComment",
				goodId: goodIdRes
			})
			console.log(temp.data)
			temp.data.forEach(item=>{
				this.comments.push(item)
			})
			Object.assign(this.goodInfo, res.data);
			console.log(res);
			this.countLine=this.comments.length-1;
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		height: 100vh;
		font-size: 32rpx;
		color: #333333;
		background-color: $background-color;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			padding-bottom: 160rpx;
			background-color: $background-color;

			.wrap {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
			}

			.card {
				display: flex;
				flex-direction: column;
				z-index: 999;
				margin-top: 380rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				border-radius: 8rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.03);

				.card_top {
					flex: 3;
					display: flex;
					justify-content: space-between;
					padding-bottom: 10rpx;

					.top_left {
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 30rpx;
						margin-right: 30rpx;

						.left_top {
							flex: 1;
							margin-top: 20rpx;
							font-family: SourceHanSansCN-Ex;
							font-size: 36rpx;
							font-weight: 550;
							line-height: 40rpx;
							letter-spacing: 0rpx;
							color: #333333;
						}

						.left_mid {
							flex: 1;
							margin-top: 20rpx;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 36rpx;
							letter-spacing: 0px;
							color: #949397;
						}
					}

					.top_right {
						margin-top: 40rpx;
						flex: 1;
						display: flex;
						flex-direction: column;

						.right_top {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							margin-right: 30rpx;

							.top_number {
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 36rpx;
								line-height: 36rpx;
								font-weight: 550;
								color: red;
							}

							.top_content {
								justify-content: flex-start;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 32rpx;
								font-weight: 500;
								line-height: 32rpx;
								margin-left: 10rpx;
							}
						}

						.right_mid {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 12px;
							background: #ffaa00;
							box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);
							margin-left: 40rpx;

							.mid_tehu {
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 11px;
								font-weight: 250;
								line-height: 15px;
								letter-spacing: 0px;
								color: #FFFFFF;
								margin-right: 6rpx;
							}

							.mid_number {
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 16px;
								font-weight: 250;
								line-height: 11px;

							}

							.mid_content {
								justify-content: flex-start;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 11px;
								font-weight: 250;
								line-height: 11px;
							}
						}
					}

				}

				.card_mid {
					margin-top: 10rpx;
				}

				.card_bottom {
					padding-left: 16rpx;
					padding-right: 16rpx;
					padding-bottom: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					flex: 2;

					.bottom_left {
						display: flex;
						align-items: center;
						justify-content: center;
						flex: 1;

						.left_left {
							width: 40rpx;
						}

						.left_content {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							margin-top: 20rpx;

							.content_top {
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 32rpx;
								font-weight: 520;
								line-height: 36rpx;
								letter-spacing: 0px;
								width: 100%;

								display: flex;
								justify-content: center;
							}

							.content_bottom {
								margin-top: 6rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 30rpx;
								font-weight: 500;
								letter-spacing: 0px;
								color: #949397;
								width: 100%;
								text-align: center;
							}
						}
					}
				}
			}

			.body {
				display: flex;
				flex-direction: column;
				margin-left: 40rpx;
				margin-right: 40rpx;
				border-radius: 8rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.03);

				margin-top: 30rpx;
				padding-bottom: 20rpx;

				.body_content {
					padding-left: 16rpx;
					padding-right: 16rpx;
					padding-bottom: 20rpx;

					.comment_card {

						.pingfen {
							margin-top: 16rpx;
							display: flex;
							align-items: center;

							.pingfen_content {
								margin-left: 40rpx;
								display: flex;
								flex-direction: column;

								.content_number {
									padding-left: 30rpx;
									width: 20vw;
									font-family: SourceHanSansCN-ExtraLight;
									font-size: 28px;
									font-weight: 250;
									line-height: 28px;
									letter-spacing: 0px;
									color: #F5B05F;
								}

								.content_xingxing {
									display: flex;
									width: 20vw;

									.xingxing_image {
										margin-left: 6rpx;
										width: 100%;
									}
								}

							}

							.pingfen_card {
								display: flex;
								align-items: center;
								flex-direction: column;
								margin-left: 100rpx;

								.card_top {}

								.card_bottom {
									display: flex;
									flex-direction: column;
								}
							}
						}

						.mid {
							display: flex;
							.tag{
								flex: 2;
								display: flex;
								flex-wrap: wrap;
								.tagContent{
									align-items: center;
								}
							}
							.time {
								align-items: center;
								margin-right: 10rpx;
								margin-left: 32rpx;
								margin-top: 14rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 13px;
								font-weight: 500;
								line-height: 11px;
								letter-spacing: 0px;
								color: $u-content-color;
							}
						}


						.user_card {
							display: flex;
							align-items: center;
							margin-top: 20rpx;
							margin-left: 40rpx;

							.user_touxiang {}


							.user_info {
								margin-left: 20rpx;
								display: flex;
								flex-direction: column;
								align-items: center;

								.user_name {
									margin-top: 6rpx;
									font-family: SourceHanSansCN-ExtraLight;
									font-size: 16px;
									font-weight: 500;
									line-height: 13px;
									letter-spacing: 0px;
									color: rgba(0, 0, 0, 0.8);
								}

								.user_time {
									margin-top: 34rpx;
									font-family: SourceHanSansCN-ExtraLight;
									font-size: 11px;
									font-weight: 500;
									line-height: 11px;
									letter-spacing: 0px;
									color: rgba(0, 0, 0, 0.8);
								}
							}

							.user_pingfen {
								margin-left: 20rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 13px;
								font-weight: 500;
								line-height: 11px;
								letter-spacing: 0px;
								color: rgba(0, 0, 0, 0.8);
							}

							.user_xingxing {
								margin-left: 16rpx;
								display: flex;
								align-items: center;
								width: 20vw;

								.xingxing {
									width: 100%;
								}
							}
						}

						.pinglun_content {
							margin-top: 20rpx;
							margin-left: 40rpx;
							margin-right: 40rpx;
							font-family: SourceHanSansCN-ExtraLight;
							font-size: 15px;
							font-weight: 500;
							letter-spacing: 0px;
							color: $u-content-color;
						}

						.pinglun_image {
							margin-top: 20rpx;
							display: flex;
							align-items: center;
							margin-left: 40rpx;
							margin-right: 40rpx;

							.image_info {
								margin-left: 26rpx;
								width: 25vw;
								height: 25vw;
							}
						}
					}

				}



			}
		}



		.bottom_info {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 120rpx;
			background-color: #F2F4F7;
			display: flex;
			align-items: center;

			.info_left {
				flex: 5;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 20rpx;

				.item {
					width: 70rpx;
					margin-left: 20rpx;
					position: relative;
				}
			}

			.info_right {
				flex: 6;
				padding-right: 20rpx;
			}
		}
	}
</style>
