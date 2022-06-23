<template>
	<view class="fullScreen">
		<Nav title="科学助农" />
		<view class="content">
			<view class="block">
				<view class="top">
					<view class="title">
						惠农政策
					</view>
					<view class="more">
						<text>查看更多</text>
						<u-image height="36rpx" width="30rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=dab6cacfa8c6767280a0498792f3f828&t=1655953181">
						</u-image>
					</view>
				</view>
				<view class="body">
					<NewsCard v-for="(item,index) in newsList" :key="index" :newsInfo="item" />
				</view>
			</view>

			<view class="block">
				<view class="top">
					<view class="title">
						视频教程
					</view>
					<view class="more">
						<text>查看更多</text>
						<u-image height="36rpx" width="30rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=dab6cacfa8c6767280a0498792f3f828&t=1655953181">
						</u-image>
					</view>
				</view>
				<view class="body">
					<view class="video_card">
						<u-waterfall v-model="videoList">
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
	export default {
		setup() {
			const list = reactive(navList);

			const newsList = reactive([{
				author: '央视网',
				title: '央行：一季度涉农贷款增速保持平稳',
				time: '2022-06-23',
				background: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news/%E7%BB%84%202696.png?sign=2b6df3c2ca163df96b517df66dc2359a&t=1655960280'
			}, {
				author: '经济日报',
				title: '中央财政安排乡村振兴补助资金1650亿元',
				time: '2022-06-10',
				background: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news/%E7%BB%84%202695.png?sign=caee78c5b271a64ee2686032ca3b1ed3&t=1655960331'
			}]);

			const videoList = reactive([{
				title: '引种与选择育种',
				url: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news-video/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5%E4%B8%8E%E5%9B%AD%E8%89%BA%E7%9A%84%E5%8E%86%E5%8F%B2.mp4?sign=bb37f624f4a61d90193d05c0bb85a28d&t=1655961113'
			}, {
				title: '基本概念与园艺的历史',
				url: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news-video/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5%E4%B8%8E%E5%9B%AD%E8%89%BA%E7%9A%84%E5%8E%86%E5%8F%B2.mp4?sign=74c170f144c17027074d9015b19e87b2&t=1655961129'
			}, {
				title: '观赏植物的分类',
				url: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news-video/%E8%A7%82%E8%B5%8F%E6%A4%8D%E7%89%A9%E5%88%86%E7%B1%BB.mp4?sign=032996c6767fc7a17d07994e8363b46a&t=1655961143'
			}, {
				title: '双王群”蜜蜂强群饲养技术',
				url: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/news-video/%E2%80%9C%E5%8F%8C%E7%8E%8B%E7%BE%A4%E2%80%9D%E8%9C%9C%E8%9C%82%E5%BC%BA%E7%BE%A4%E9%A5%B2%E5%85%BB%E6%8A%80%E6%9C%AF.mp4?sign=acad3d26904f091b1caf0477b9a675ac&t=1655959493'
			}]);

			return {
				list,
				newsList,
				videoList
			}
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
