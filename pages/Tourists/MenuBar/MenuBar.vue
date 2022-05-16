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
					<u-button type="primary" size="mini" @click="searchContent">搜索</u-button>
				</view>

			</view>
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
	export default {
		setup() {
			const list = reactive(navList);
			const keyword = ref('');
			
			const gotoRelease = ()=>{
				uni.navigateTo({
					url:"/pages/Tourists/Release/Release"
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
				gotoRelease
			}
		}

	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;

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
	}
</style>
