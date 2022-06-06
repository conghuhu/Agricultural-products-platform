<template>
	<view class="fullScreen">
		<Nav title="商品查询" :isBack="true"></Nav>
		<view class="search">
			<view class="search_contain">
				<u-search placeholder="请输入关键字" v-model="keyword" :clearabled="true" :show-action="false"
					@search="searchContent"></u-search>
			</view>
			<view class="search_btn">
				<u-button :custom-style="search_btn_style" type="primary" @click="searchContent">搜索</u-button>
			</view>
		</view>
		<view class="search_found">
			<view class="content">搜索发现</view>
			<view class="tag">
				<view class="tag_top">
					<view class="tag_content">
						<u-tag text="旺仔" type="error" mode="dark" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="粽子" type="error" mode="dark" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="榴莲" type="info" mode="plain" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="西瓜" type="error" mode="dark" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="鸡蛋" type="info" mode="plain" shape="circle" />
					</view>
				</view>
				<view class="tage_bottom">
					<view class="tag_content">
						<u-tag text="豆腐" type="error" mode="dark" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="啤酒" type="info" mode="plain" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="水" type="info" mode="plain" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="面条" type="info" mode="plain" shape="circle" />
					</view>
					<view class="tag_content">
						<u-tag text="玉米" type="info" mode="plain" shape="circle" />
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card_top">
				<view class="top_left">买菜热卖榜</view>
				<view class="top_right">全部></view>
			</view>
			<view class="card_content">
				<view class="content_info">
					<view class="info_image">
						<u-image width="100%" mode="widthFix" height="80px"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/categoryItem/%E7%95%AA%E8%8C%84.png?sign=a4138baa8d9412d42351c075c5151389&t=1654133092">
						</u-image>
					</view>
					<view class="info_right">
						<view class="right_top">蔬菜热卖榜</view>
						<view class="right_bottom">热卖指数92.5</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script lang="ts">
	export default {
		setup() {

		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		
		position: relative;
		font-size: 32rpx;

		.search {
			display: flex;
			align-items: center;

			.search_contain {
				margin-left: 10rpx;
				flex: 10;
				width: 100%;
			}

			.search_btn {
				margin-right: 10rpx;
				flex: 1;
				width: 100%;
			}
		}

		.search_found {
			display: flex;
			flex-direction: column;

			.content {
				margin-top: 20rpx;
				margin-left: 20rpx;
				font-size: 16px;
				font-weight: bold;
			}

			.tag {
				display: flex;
				margin-top: 20rpx;
				margin-left: 30rpx;
				flex-direction: column;

				.tag_top {
					display: flex;

					.tag_content {
						margin-left: 20rpx;
					}
				}

				.tage_bottom {
					display: flex;
					margin-top: 20rpx;

					.tag_content {
						margin-left: 20rpx;
					}
				}


			}
		}

		.card {
			margin-top: 30rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			border: 0;
			background: linear-gradient(#fedfda 6%,#feefe8 70%,#fff4f2 98%);
			box-shadow: 0px 10rpx 15rpx 0px rgba(27, 28, 32, 0.05);

			.card_top {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.top_left {
					margin-top: 20rpx;
					margin-left: 20rpx;
					font-family: vivo type CNS Regular;
					font-size: 16px;
					color: #ff0000;
					font-weight: bold;
				}

				.top_right {
					margin-top: 20rpx;
					font-size: 13px;
					color: $u-type-info-dark;
					margin-right: 20rpx;
				}
			}

			.card_content {
				display: flex;
				margin-top: 30rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
				border: 0;
				background: #ffffff;
				box-shadow: 0px 10rpx 15rpx 0px rgba(27, 28, 32, 0.05);
				flex-direction: column;

				.content_info {
					display: flex;

					.info_image {
						margin: 10rpx;
						width: 22vw;

					}

					.info_right {
						display: flex;
						margin-top: 26rpx;
						flex-direction: column;

						.right_top {
							margin-left: 20rpx;
							font-size: 14px;
							font-weight: bold;
						}

						.right_bottom {
							margin-top: 20rpx;
							margin-left: 20rpx;
							font-size: 11px;
							color: #ff0000;
							font-weight: bold;
						}
					}
				}
			}
		}


	}
</style>
