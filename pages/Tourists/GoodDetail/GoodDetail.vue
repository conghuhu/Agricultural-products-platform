<template>
	<view class="fullScreen">
		<Nav title="商品详情" :isBack="true"></Nav>
		<view class="content">
			<view class="wrap">
					<u-swiper  height="450"  :list="warpList"></u-swiper>
				</view>
			<view class="card">
				<view class="card_top">
					<view class="top_left">
						<view class="left_top">精选大苹果</view>
						<view class="left_mid">精选大苹果的描述内容</view>
						<view class="left_bottom">
							<view class="bottom_image">
								<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/xingxing.png"></u-image>
							</view>
							<view class="bottom_image">
								<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/xingxing.png"></u-image>
							</view>
							<view class="bottom_image">
								<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/xingxing.png"></u-image>
							</view>
							<view class="bottom_image">
								<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/xingxing.png"></u-image>
							</view>
							<view class="bottom_image">
								<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/xingxing.png"></u-image>
							</view>
						</view>
					</view>
					<view class="top_right">
						<view class="right_top">
							<view class="top_number">79</view>
							<view class="top_content">元/份</view>
						</view>
						<view class="right_mid">
							<view class="mid_tehu">现实折扣</view>
							<view class="mid_number">59</view>
							<view class="mid_content">元/份</view>
						</view>
					</view>
				</view>
				<view class="card_mid">
					<u-line color="#bababa" />
				</view>
				<view class="card_bottom">
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/peisongTime.png"></u-image>
						</view>
						<view class="left_content">
							<view class="content_top">2天</view>
							<view class="content_bottom">配送时间</view>
						</view>
					</view>
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/fahuoAddress.png"></u-image>
						</view>
						<view class="left_content">
							<view class="content_top">山东烟台</view>
							<view class="content_bottom">产地</view>
						</view>
					</view>
					<view class="bottom_left">
						<view class="left_left">
							<u-image width="100%" height="12px" mode="aspectFit" src="./static/images/peisongStyle.png"></u-image>
						</view>
						<view class="left_content">
							<view class="content_top">顺丰快递</view>
							<view class="content_bottom">配送方式</view>
						</view>
					</view>
				</view>
			</view>
		    <view class="tab">
				<view class="tab_top">评价</view>
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
			return {
				goodId,
				goodInfo,
				warpList
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
		background-color: #F2F4F7;

		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			.wrap{
				position: absolute;
				top: 0;
				left: 0;
				height: 10vh;
				width: 100%;
			}
			.card{
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
				.card_top{
					flex: 3;
					display: flex;
					justify-content: space-between;
					.top_left{
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 30rpx;
						margin-right: 30rpx;
						.left_top{
							flex: 1;
							margin-top: 20rpx;
							font-family: SourceHanSansCN-Ex;
							font-size: 16px;
							font-weight: 250;
							line-height: 16px;
							letter-spacing: 0px;
							color: #333333;
						}
						.left_mid{
							flex: 1;
							margin-top: 20rpx;
							font-size: 11px;
							font-weight: 250;
							line-height: 11px;
							letter-spacing: 0px;
							color: #949397;
						}
						.left_bottom{
							margin-top: 0;
							flex: 1;
							display: flex;
							align-items: center;
							.bottom_image{
								margin: 0;
								padding: 0;
								width: 3vw;
								height: 14px;
							}
						}
					}
					.top_right{
						margin-top: 40rpx;
						flex: 1;
						display: flex;
						flex-direction: column;
						.right_top{
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: 40rpx;
							.top_number{
								margin-left: 80rpx;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 16px;
								font-weight: 250;
								line-height: 11px;
							}
							.top_content{
								justify-content: flex-start;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 11px;
								font-weight: 250;
								line-height: 11px;
								
							}
						}
						.right_mid{
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 12px;
							background: #ffaa00;
							box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.03);
							margin-left: 40rpx;
							.mid_tehu{
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 11px;
								font-weight: 250;
								line-height: 15px;
								letter-spacing: 0px;
								color: #FFFFFF;
								margin-right: 6rpx;
							}
							.mid_number{
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 16px;
								font-weight: 250;
								line-height: 11px;
							}
							.mid_content{
								justify-content: flex-start;
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 11px;
								font-weight: 250;
								line-height: 11px;
							}
						}
					}
					
				}
				.card_mid{
					margin-top: 10rpx;
				}
				.card_bottom{
					margin-left: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 2;
					.bottom_left{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 50rpx;
						.left_left{
							
							width: 5vw;
							margin-right: 10rpx;
						}
						.left_content{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							margin-top: 20rpx;
							.content_top{
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 13px;
								font-weight: 250;
								line-height: 13px;
								letter-spacing: 0px;
							}
							.content_bottom{
								font-family: SourceHanSansCN-ExtraLight;
								font-size: 9px;
								font-weight: 250;
								line-height: 9px;
								letter-spacing: 0px;
								color: #949397;
							}
						}
					}
				}
			}
		.tab{
			display: flex;
			align-items: center;
			justify-content: center;
			.tab_top{
				font-family: SourceHanSansCN-ExtraLight;
				font-size: 16px;
				font-weight: 250;
				line-height: 16px;
				letter-spacing: 0px;
				color: #F5B05F;
			}
		}
		}
	}
</style>
