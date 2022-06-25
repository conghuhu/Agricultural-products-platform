<template>
	<view class="card" v-if="JSON.stringify(videoInfo) != '{}'" @click="gotoDetail">
		<video class=" video_back" objectFit="cover" :controls="false" :autoplay="true" :loop="true" :muted="true"
			@loadedmetadata="loadedmetadata" :src="videoInfo.url"></video>
		<view class="title">
			<Ellipsis :content="videoInfo.title" :width="260" />
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import request from '@/api/request';
	import dayjs from 'dayjs';
	export default {
		props: {
			videoInfo: {
				type: Object,
				default: () => {},
				required: false,
			},
		},
		setup(props) {
			const loadedmetadata = (e) => {
				console.log(e.detail);
			}
			const gotoDetail = () => {
				uni.navigateTo({
					url: `/pages/Merchants/VideoDetail/VideoDetail?videoId=${props.videoInfo._id}`
				});
			}
			onMounted(() => {});
			return {
				loadedmetadata,
				gotoDetail
			}
		},
		onReady() {}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 10rpx;
		min-height: 180rpx;
		margin-bottom: 30rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding: 16rpx;

		color: #fff;

		padding: 20rpx;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;

		.title {
			font-weight: 550;
			font-size: 28rpx;
			z-index: 10;
		}

		.video_back {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
			width: 100%;
			height: 100%;
			object-fit: fill;
			border-radius: 10rpx;
		}
	}
</style>
