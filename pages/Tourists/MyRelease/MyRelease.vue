<template>
	<view class="fullScreen">
		<Nav title="我的种草" isBack />
		<view class="content">
			<view style="width: 100%;height: 70vh;display: flex;justify-content: center;align-items: center;"
				v-if="loading">
				<MyLoading />
			</view>

			<block v-else>
				<u-waterfall v-model="shareList">
					<template v-slot:left="{leftList}">
						<view v-for="(item, index) in leftList" :key="item._id">
							<ShareCard :item="item" />
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view v-for="(item, index) in rightList" :key="item._id">
							<ShareCard :item="item" />
						</view>
					</template>
				</u-waterfall>
			</block>
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
			const shareList = reactive([]);
			return {
				shareList,
				loading
			}
		},
		async onLoad() {
			const res = await request('share', {
				type: 'getOneShareList'
			});
			console.log(res);
			this.shareList.length = 0;
			res.data.forEach(item => {
				this.shareList.push(item);
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
			padding: 10rpx;
			padding-bottom: 50rpx;
		}
	}
</style>
