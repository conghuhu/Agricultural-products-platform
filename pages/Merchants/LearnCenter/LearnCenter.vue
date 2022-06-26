<template>
	<view class="fullScreen">
		<Nav title="科学助农" />
		<view class="content">
			<view class="block">
				<view class="top">
					<view class="title">
						惠农政策
					</view>
					<view class="more" @click="gotoMore('news')">
						<text>查看更多</text>
						<u-image height="36rpx" width="30rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=dab6cacfa8c6767280a0498792f3f828&t=1655953181">
						</u-image>
					</view>
				</view>
				<view class="body">
					<MyLoading v-if="newsLoading" />
					<NewsCard v-else v-for="(item,index) in newsList" :key="item._id" :newsInfo="item" />
				</view>
			</view>

			<view class="block">
				<view class="top">
					<view class="title">
						视频教程
					</view>
					<view class="more" @click="gotoMore('video')">
						<text>查看更多</text>
						<u-image height="36rpx" width="30rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=dab6cacfa8c6767280a0498792f3f828&t=1655953181">
						</u-image>
					</view>
				</view>
				<view class="body">
					<view class="video_card">
						<MyLoading v-if="videoLoading" />

						<u-waterfall v-else v-model="videoList">
							<template v-slot:left="{leftList}">
								<view v-for="(item, index) in leftList" :key="item._id">
									<VideoCard :videoInfo="item" />
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view v-for="(item, index) in rightList" :key="item._id">
									<VideoCard :videoInfo="item" />
								</view>
							</template>
						</u-waterfall>
					</view>
				</view>
			</view>
		</view>

		<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	import request from '@/api/request';
	export default {
		setup() {
			const list = reactive(navList);

			const newsLoading = ref(true);

			const videoLoading = ref(true);

			const newsList = reactive([]);

			const videoList = reactive([]);

			const gotoMore = (type) => {
				uni.navigateTo({
					url: `/pages/Merchants/AllNewsOrVideo/AllNewsOrVideo?type=${type}`
				})
			}

			return {
				list,
				newsList,
				videoList,
				newsLoading,
				videoLoading,
				gotoMore
			}
		},
		async onShow() {
			this.newsLoading = true;
			this.videoLoading = true;
			const res = await Promise.all([request('news', {
				type: 'getPloicy',
				limit: 3
			}), request('news', {
				type: 'getVideoList',
				limit: 4
			})]);
			this.newsList.length = 0;
			this.videoList.length = 0;
			res[0].data.forEach(item => {
				this.newsList.push(item);
			});
			res[1].data.forEach(item => {
				this.videoList.push(item);
			})
			this.newsLoading = false;
			this.videoLoading = false;
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: $background-color;

		.content {
			position: relative;
			background-color: $background-color;
			padding: 30rpx;

			.block {
				width: 100%;

				.top {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					margin-bottom: 20rpx;

					.title {
						font-weight: 550;
						font-size: 34rpx;
					}

					.more {
						display: flex;
						align-items: center;
						color: $u-content-color;
						font-size: 30rpx;
					}
				}

				.video_card {
					border-radius: 10rpx;

				}
			}
		}
	}
</style>
