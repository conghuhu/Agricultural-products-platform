<template>
	<view class="fullScreen">
		<Nav title="位置" isBack />
		<map style="width: 750rpx;height: 100%;" :show-compass="true" :show-location="true" :longitude="longitude"
			:latitude="latitude" :markers="covers"></map>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		watch
	} from 'vue'
	export default {
		setup() {
			const longitude = ref(116.39742);
			const latitude = ref(39.909);
			const covers = reactive([{
				id: 1,
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location_dark.png?sign=f34a45d72d702b9101c0d4c22218e648&t=1655992821',
				width: '60rpx',
				height: '60rpx'
			}]);
			// ToDo 接入路径规划
			return {
				longitude,
				latitude,
				covers
			}
		},
		onLoad(option) {
			this.longitude = option.longitude;
			this.latitude = option.latitude;
			this.covers[0].longitude = option.longitude;
			this.covers[0].latitude = option.latitude;
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;
	}
</style>
