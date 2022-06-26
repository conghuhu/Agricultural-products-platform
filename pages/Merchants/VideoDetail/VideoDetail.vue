<template>
	<view class="fullScreen">
		<Nav title="视频教程" isBack />
		<view class="content">
			<MyLoading v-show="loading"></MyLoading>
			<video v-show="!loading" class="video_back" objectFit="contain" :controls="true" :autoplay="false"
				:loop="true" :muted="false" @loadedmetadata="loadedmetadata" :src="videoInfo.url"></video>
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
			const loading = ref(true);
			const videoInfo = reactive({

			});
			const loadedmetadata = (e) => {
				console.log(e);
				loading.value = false;
			}
			return {
				loadedmetadata,
				videoInfo,
				loading
			}
		},
		async onLoad(option) {
			const res = await request('news', {
				type: 'getVideoById',
				videoId: option.videoId
			});
			Object.assign(this.videoInfo, res.data);
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

			.video_back {
				z-index: 0;
				width: 100%;
				height: 45vh;
				margin-top: 30rpx;
			}
		}
	}
</style>
