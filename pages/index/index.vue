<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		useCounterStore
	} from '@/stores/counter';
	import {
		ref
	} from 'vue'
	import request from '@/api/request';

	export default {
		setup() {
			const title = ref("hello");
			const counter = useCounterStore();
			counter.increment();
			console.log(counter.count)
			return {
				title
			}
		},
		onLoad() {
			request("hello", {}).then((res) => {
				console.log(res);
			})
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
