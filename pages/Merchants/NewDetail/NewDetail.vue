<template>
	<view class="fullScreen">
		<Nav title="文章详情" isBack />
		<view class="content">
			<NewsCard :newsInfo="info" />

			<view class="top">
				<u-image v-show="info.time != ''" width="36rpx" height="36rpx" mode="aspectFit"
					src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/%E6%97%B6%E9%97%B4.png?sign=1850e3b514b003ced95aa4d09edef9e4&t=1656138942">
				</u-image>
				<text v-show="info.time != ''" class="time">{{dayjs(info.time).format('YYYY-MM-DD HH:mm')}}</text>
			</view>

			<mp-html :content="info.content" selectable :lazyLoad="true">
				<MyLoading />
			</mp-html>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import request from '@/api/request';
	import dayjs from 'dayjs';
	export default {
		setup() {
			const info = reactive({
				_id: '',
				author: '',
				time: '',
				title: '',
				content: '',
				background: ''
			});

			return {
				info,
				dayjs
			}
		},
		async onLoad(option) {
			const res = await request('news', {
				type: 'getPloicyById',
				newsId: option.newsId
			});
			Object.assign(this.info, res.data);
			console.log(res);
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

			.top {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

				.time {
					margin-left: 16rpx;
					color: $u-content-color;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
