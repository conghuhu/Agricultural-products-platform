<template>
	<view class="card" :style="`background-image:url(${newsInfo.background});`">
		<view class="author">
			{{newsInfo.author}}
		</view>
		<view class="title">
			{{newsInfo.title}}
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import request from '@/api/request';
	import dayjs from 'dayjs';
	export default {
		props: {
			newsInfo: {
				type: Object,
				default: () => {},
				required: true,
			},
		},
		setup() {

		}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 10rpx;
		height: 220rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		// background-image: url('https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/shopback.webp?sign=24c799b2e77b1d3078a11768789e879c&t=1652499708');
		background-size: cover;
		background-repeat: no-repeat;
		color: #fff;
		
		padding: 20rpx;
		
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		
		.title{
			font-weight: 550;
			font-size: 34rpx;
		}
	}
</style>
