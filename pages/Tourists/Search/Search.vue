<template>
	<view class="fullScreen">
		<Nav title="商品查询" :isBack="true"></Nav>
		<view class="content">
			<view class="search">
				<view class="search_contain">
					<u-search placeholder="请输入关键字" borderColor="#abaaaa" v-model="keyword" :focus="true"
						:clearabled="true" :show-action="false" @search="searchContent"></u-search>
				</view>
				<view class="search_btn">
					<u-button :custom-style="search_btn_style" type="primary" @click="searchContent">搜索</u-button>
				</view>
			</view>
			<MyLoading v-if="loading" />
			<block v-else>
				<view class="search_found">
					<view class="content">搜索发现</view>
					<view class="tag">
						<view class="tag_content" v-for="(item,index) in recommendWords" :key="item._id">
							<u-tag size="large" v-if="item.count > 5" :text="item.keyword" @click="selectTag(item.keyword)"
								type="error" mode="dark" shape="circle" />
							<u-tag size="large" v-else :text="item.keyword" @click="selectTag(item.keyword)"
								borderColor="transparent" type="info" mode="plain" shape="circle" />
						</view>
					</view>
				</view>
				<view class="card">
					<view class="card_top">
						<view class="top_left">商品热卖榜</view>
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
			</block>

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
			const search_btn_style = ref({
				height: '60rpx',
				width: '120rpx'
			});

			const keyword = ref('');

			const recommendWords = reactive([]);

			const loading = ref(true);

			const searchContent = () => {
				uni.navigateTo({
					url: `/pages/Tourists/SearchContent/SearchContent?keyword=${keyword.value}`
				})
			}

			const selectTag = (value) => {
				keyword.value = value;
				searchContent();
			};

			return {
				search_btn_style,
				searchContent,
				keyword,
				selectTag,
				recommendWords,
				loading
			}
		},
		async onLoad(option) {
			const res = await request('recommend', {
				type: 'getHotwords'
			});
			this.recommendWords.length = 0;
			res.data.forEach(item => {
				this.recommendWords.push(item);
			});
			this.loading = false;
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		width: 100%;
		position: relative;
		font-size: 32rpx;
		height: 100vh;
		background-color: $background-color;

		.content {
			background-color: $background-color;
		}

		.search {
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.search_contain {
				flex: 10;
				width: 100%;
				margin-right: 20rpx;
			}

			.search_btn {
				flex: 1;
				width: 100%;
			}
		}

		.search_found {
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			padding: 20rpx;

			.content {
				font-size: 16px;
				font-weight: bold;
			}

			.tag {
				display: flex;
				margin-top: 20rpx;
				flex-wrap: wrap;

				.tag_content {
					margin-left: 10rpx;
					margin-right: 10rpx;
					margin-bottom: 20rpx;
				}
			}
		}

		.card {
			margin-top: 30rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			border: 0;
			background: linear-gradient(#fedfda 6%, #feefe8 70%, #fff4f2 98%);
			box-shadow: 0px 10rpx 15rpx 0px rgba(27, 28, 32, 0.05);
			padding: 20rpx;
			padding-bottom: 20rpx;

			.card_top {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.top_left {
					font-family: vivo type CNS Regular;
					font-size: 16px;
					color: #ff0000;
					font-weight: bold;
				}

				.top_right {
					font-size: 13px;
					color: $u-type-info-dark;
					margin-right: 20rpx;
				}
			}

			.card_content {
				display: flex;
				margin-top: 30rpx;
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
