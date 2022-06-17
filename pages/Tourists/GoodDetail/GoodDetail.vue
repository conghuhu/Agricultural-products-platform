<template>
	<view class="fullScreen">
		<Nav title="商品详情" :isBack="true"></Nav>
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
							<view class="content_top">{{goodInfo.originPlace}}</view>
							<view class="content_bottom">产地</view>
						</view>
					</view>
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="40" mode="aspectFit" src="./static/images/peisongStyle.png">
							</u-image>
						</view>
						<view class="left_content">
							<view class="content_top">{{goodInfo.mode == 1 ? "即时配送":"顺丰物流"}}</view>
							<view class="content_bottom">配送方式</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tab">
				<view class="tab_top">评价</view>
				<view class="tab_mid">相关介绍</view>
				<view class="tab_end">规格参数</view>
			</view>
			<view class="pingfen">
				<view class="pingfen_content">
					<view class="content_number">4.2</view>
					<view class="content_xingxing">
						<view class="xingxing_image">
							<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
							</u-image>
						</view>
						<view class="xingxing_image">
							<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
							</u-image>
						</view>
						<view class="xingxing_image">
							<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
							</u-image>
						</view>
						<view class="xingxing_image">
							<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
							</u-image>
						</view>
						<view class="xingxing_image">
							<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
							</u-image>

						</view>
					</view>
				</view>
				<view class="pingfen_card">
					<view class="card_top">
						<u-tag text="全部" mode="dark" size="mini" shape="circle" type="info" />
						<u-tag text="最新" mode="dark" size="mini" shape="circle" type="info" />
						<u-tag text="好评" mode="dark" size="mini" shape="circle" type="info" />
						<u-tag text="差评" mode="dark" size="mini" shape="circle" type="info" />
					</view>
					<view class="card_bottom">
						<u-tag text="非常新鲜" mode="dark" shape="circle" type="info" />
						<u-tag text="物超所值" mode="dark" shape="circle" type="info" />
					</view>
				</view>
			</view>
			<view class="user_card">
				<view class="user_touxiang">
					<u-image width="100%" height="100rpx" mode="heightFix"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/categoryItem/%E9%B8%A1%E9%B8%AD%E7%A6%BD.png?sign=bb359dfca20a987b356e2d4a4415573b&t=1653984717">
					</u-image>
				</view>
				<view class="user_info">
					<view class="user_name">小王同学</view>
					<view class="user_time">2022.5.1</view>
				</view>
				<view class="user_pingfen">5.0</view>
				<view class="user_xingxing">
					<view class="xingxing">
						<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
						</u-image>
					</view>
					<view class="xingxing">
						<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
						</u-image>
					</view>
					<view class="xingxing">
						<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
						</u-image>
					</view>
					<view class="xingxing">
						<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
						</u-image>
					</view>
					<view class="xingxing">
						<u-image width="100%" height="16px" mode="aspectFit" src="./static/images/xingxing.png">
						</u-image>
					</view>
				</view>
			</view>
			<view class="pinglun_content">
				评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
			</view>
			<view class="pinglun_image">
				<view class="image_info">
					<u-image width="100%" height="70px"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/3.png?sign=8f729fbad4e530b1ca32a3156e633933&t=1652588964">
					</u-image>
				</view>
				<view class="image_info">
					<u-image width="100%" height="70px"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/3.png?sign=8f729fbad4e530b1ca32a3156e633933&t=1652588964">
					</u-image>
				</view>
				<view class="image_info">
					<u-image width="100%" height="70px"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/3.png?sign=8f729fbad4e530b1ca32a3156e633933&t=1652588964">
					</u-image>
				</view>
			</view>
		</view>
		<view class="bottom_info">
			<view class="info_left" @click="tokefu">
				<u-image width="100%" mode="aspectFit" height="20px" src="./static/images/kefu.png"></u-image>
			</view>
			<view class="info_left">
				<u-image width="100%" mode="aspectFit" height="20px" src="./static/images/shoppingCart.png"></u-image>
			</view>
			<view class="info_right">
				<u-button shape="circle" type="success">+加入购物车</u-button>
			</view>
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
				_openid:""
			})
			const warpList = reactive([{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				},
			])
			const tokefu = async function() {
				uni.navigateTo({
					url: `/pages/Tourists/ChatRoom/ChatRoom?m_openId=${goodInfo._openid}`
				})
			}
			return {
				goodId,
				goodInfo,
				warpList,
				tokefu
			}
		},
		async onLoad(option) {
			const goodIdRes = option.goodId;
			this.goodId = goodIdRes;
			const res = await request('goods', {
				type: 'getGoodById',
				goodId: goodIdRes
			})
			Object.assign(this.goodInfo, res.data);
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
				margin-left: 50rpx;
				margin-right: 50rpx;
				height: 30vw;
				border-radius: 4px;
				background: #FFFFFF;
				box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);

				.card_top {
					flex: 3;
					display: flex;
					justify-content: space-between;

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
							font-size: 32rpx;
							font-weight: 550;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #333333;
						}

						.left_mid {
							flex: 1;
							margin-top: 20rpx;
							font-size: 30rpx;
							font-weight: 500;
							line-height: 30rpx;
							letter-spacing: 0px;
							color: #949397;
						}

						.left_bottom {
							margin-top: 0;
							flex: 1;
							display: flex;
							align-items: center;

							.bottom_image {
								margin: 0;
								padding: 0;
								width: 3vw;
								height: 14px;
							}
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
							justify-content: center;
							margin-left: 40rpx;

							.top_number {
								margin-left: 80rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 34rpx;
								line-height: 34rpx;
								font-weight: 550;
								color: red;
							}

							.top_content {
								justify-content: flex-start;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 30rpx;
								font-weight: 500;
								line-height: 30rpx;
								margin-left: 6rpx;
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
					padding-left: 10rpx;
					padding-right: 10rpx;
					padding-bottom: 16rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					flex: 2;

					.bottom_left {
						display: flex;
						align-items: center;
						justify-content: center;

						.left_left {
							width: 40rpx;
							margin-right: 10rpx;
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
								font-size: 30rpx;
								font-weight: 520;
								line-height: 34rpx;
								letter-spacing: 0px;
							}

							.content_bottom {
								margin-top: 6rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 28rpx;
								font-weight: 500;
								letter-spacing: 0px;
								color: #949397;
							}
						}
					}
				}
			}

			.tab {
				display: flex;
				align-items: center;
				justify-content: center;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 40rpx;

				.tab_top {
					font-family: SourceHanSansCN-ExtraLight;
					font-size: 16px;
					font-weight: 250;
					line-height: 16px;
					letter-spacing: 0px;
					font-weight: bold;
					color: #F5B05F;
				}

				.tab_mid {
					font-family: SourceHanSansCN-Bold;
					font-size: 16px;
					font-weight: bold;
					line-height: 16px;
					letter-spacing: 0px;
					color: #999999;
				}

				.tab_end {
					font-family: SourceHanSansCN-Bold;
					font-size: 16px;
					font-weight: bold;
					line-height: 16px;
					letter-spacing: 0px;
					color: #999999;
				}
			}

			.pingfen {
				margin-top: 40rpx;
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

					.card_bottom {}
				}
			}

			.user_card {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				margin-left: 40rpx;

				.user_touxiang {}

				.user_info {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.user_name {
						font-family: SourceHanSansCN-ExtraLight;
						font-size: 16px;
						font-weight: 300;
						line-height: 13px;
						letter-spacing: 0px;
						color: rgba(0, 0, 0, 0.8);
					}

					.user_time {
						margin-top: 10rpx;
						font-family: SourceHanSansCN-ExtraLight;
						font-size: 11px;
						font-weight: 250;
						line-height: 11px;
						letter-spacing: 0px;
						color: rgba(0, 0, 0, 0.35);
					}
				}

				.user_pingfen {
					margin-left: 20rpx;
					font-family: SourceHanSansCN-ExtraLight;
					font-size: 13px;
					font-weight: 250;
					line-height: 11px;
					letter-spacing: 0px;
					color: rgba(0, 0, 0, 0.35);
				}

				.user_xingxing {
					margin-left: 30rpx;
					display: flex;
					align-items: center;
					width: 20vw;

					.xingxing {
						width: 100%;
					}
				}
			}

			.pinglun_content {
				margin-left: 40rpx;
				margin-right: 40rpx;
				font-family: SourceHanSansCN-ExtraLight;
				font-size: 13px;
				font-weight: 250;
				letter-spacing: 0px;
				color: rgba(0, 0, 0, 0.8);
			}

			.pinglun_image {
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

		.bottom_info {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 120rpx;
			background-color: #F2F4F7;
			display: flex;

			.info_left {
				flex: 3;
				margin-top: 40rpx;

			}

			.info_right {
				flex: 7;
				padding-right: 20rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
