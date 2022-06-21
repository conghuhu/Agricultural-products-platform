<template>
	<view class="fullScreen">
		<Nav title="心选种草" isBack />
		<view class="content">

		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import request from '@/api/request';
	import navList from '@/pages/Tourists/utils/navList';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	export default {
		setup() {
			const loading = ref(true);
			const dataList = reactive([]);
			return {
				dataList,
				loading
			}
		},
		async onLoad() {
			const res = await request('star_focus', {
				type: 'getOneStarInfoList'
			});
			console.log(res);
			this.dataList.length = 0;
			res.data.forEach(item => {
				this.dataList.push(item);
			});
			this.loading = false;
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

		.content {
			background-color: $background-color;
		}
	}
</style>
