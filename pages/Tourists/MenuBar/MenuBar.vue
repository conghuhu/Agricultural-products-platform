<template>
	<view class="fullScreen">
		<Nav title="种草"></Nav>
		<view class="top_tool">
			<view class="release" @click="gotoRelease">
				<u-image height="54rpx" width="54rpx" mode="aspectFill"
					src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/touristImagee/release.png?sign=3e50de66fc62aa3c609afaa17a9fd90d&t=1652690449" />
			</view>
			<view class="search">
				<view class="search_content">
					<u-search placeholder="请输入关键字" v-model="keyword" :clearabled="true" :show-action="false"
						@search="searchContent"></u-search>
				</view>
				<view class="search_btn">
					<u-button :custom-style="search_btn_style" type="primary" @click="searchContent">搜索</u-button>
				</view>
			</view>
		</view>
		<view class="content">
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
		</view>
		<view>
			<u-tabbar :list="list" :mid-button="true"></u-tabbar>
		</view>
	</view>

</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';

	export default {
		setup() {
			const list = reactive(navList);
			const keyword = ref('');
			const shareList = reactive([]);
			const search_btn_style = ref({
				height: '60rpx'
			});

			const gotoRelease = () => {
				uni.navigateTo({
					url: "/pages/Tourists/Release/Release"
				})
			}
			/**
			 * 搜索页面内容
			 */
			const searchContent = () => {
				console.log(keyword.value)
			}
			return {
				list,
				keyword,
				searchContent,
				gotoRelease,
				shareList,
				search_btn_style
			}
		},
		async onShow() {
			const res = await request('share', {
				type: 'getShareList'
			});
			console.log(res);
			this.shareList.length = 0;
			res.data.forEach(item => {
				this.shareList.push(item);
			});
		}

	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		background-color: #F2F4F7;
		width: 100%;

		.top_tool {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;

			.release {
				padding: 6rpx;
				flex: 1;
			}

			.search {
				flex: 7;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.search_content {
					flex: 5;
					margin-right: 16rpx;
				}

				.search_btn {
					flex: 1;
				}
			}
		}

		.content {
			padding: 10rpx;


		}
	}
</style>
