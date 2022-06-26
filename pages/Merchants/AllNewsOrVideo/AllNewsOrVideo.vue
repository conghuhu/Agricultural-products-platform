<template>
	<view class="fullScreen">
		<Nav :title="type === 'news' ?'政策文章':'农业教程'" isBack />
		<view class="content">
			<block v-if="type === 'news'">
				<MyLoading v-if="loading" />
				<NewsCard v-else v-for="(item,index) in newsList" :key="item._id" :newsInfo="item" />
			</block>
			<block v-else>
				<MyLoading v-if="loading" />

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
			</block>
		</view>

	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import request from '@/api/request';
	export default {
		setup() {
			const type = ref('news');

			const loading = ref(true);

			const newsList = reactive([]);

			const videoList = reactive([]);

			return {
				type,
				loading,
				newsList,
				videoList
			}
		},
		async onLoad(option) {
			this.type = option.type;
			if (option.type === 'news') {
				const res = await request('news', {
					type: 'getPloicy'
				});
				console.log(res);
				this.newsList.length = 0;
				res.data.forEach(item => {
					this.newsList.push(item);
				});
				this.loading = false;
			} else {
				const res = await request('news', {
					type: 'getVideoList',
				});
				this.videoList.length = 0;
				res.data.forEach(item => {
					this.videoList.push(item);
				});
				this.loading = false;
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

		}
	}
</style>
