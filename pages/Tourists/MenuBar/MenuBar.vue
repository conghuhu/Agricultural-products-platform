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
					<u-search borderColor="#909399" placeholder="请输入关键字" v-model="keyword" :clearabled="true"
						:show-action="false" @search="searchContent" @clear="searchContent"></u-search>
				</view>
				<view class="search_btn">
					<u-button :custom-style="search_btn_style" type="primary" @click="searchContent">搜索</u-button>
				</view>
			</view>
		</view>
		<view class="content">
			<MyLoading v-if="loading" />
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
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
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
			const loading = ref(true);

			const gotoRelease = () => {
				uni.navigateTo({
					url: "/pages/Tourists/Release/Release"
				})
			}
			/**
			 * 搜索页面内容
			 */
			const searchContent = async () => {
				console.log(keyword.value);
				await init(keyword.value);
			};

			const init = async (value: string) => {
				loading.value = true;
				let res;
				if (value != null) {
					res = await request('share', {
						type: 'getShareList',
						value: value
					});
				} else {
					res = await request('share', {
						type: 'getShareList'
					});
				}

				console.log(res);
				shareList.length = 0;
				res.data.forEach(item => {
					shareList.push(item);
				});
				loading.value = false;
			};
			return {
				list,
				keyword,
				searchContent,
				gotoRelease,
				shareList,
				search_btn_style,
				init,
				loading
			}
		},
		async onLoad() {
			// await this.init();
		},
		async onShow(){
			await this.init();
		}

	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		background-color: $background-color;
		width: 100%;

		.top_tool {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			position: fixed;
			z-index: 99;
			background-color: $background-color;

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
			background-color: $background-color;
			padding-bottom: 50rpx;
			margin-top: 100rpx;
		}
	}
</style>
