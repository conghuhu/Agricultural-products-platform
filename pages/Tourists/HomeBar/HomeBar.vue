<template>
	<view>
		<view>
			<u-navbar title="当前位置" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
					获取当前位置
				</view>
			</u-navbar>
		</view>
		<view>
			<u-search :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<view class="wrap" >
			<u-swiper :list="viewList" :effect3d="true"></u-swiper>
		</view>
		<view>
			<u-grid :col="4">
				<u-grid-item>
					<u-badge count="9" :offset="[20, 20]"></u-badge>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/images/小油菜.jpg" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				
			</u-grid>
		</view>
		<view>
			<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
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
			const list = reactive(navList)
			const current = ref(0);
			const background = ref({
				backgroundColor: '#001f3f',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			})
			const viewList = ref([{						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'					},
			{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				])
			async function rightClick() {
				console.log(11111)
				uni.navigateTo({
					url: "../Location/Location"
				})
			}
			return {
				list,
				current,
				background,
				rightClick,
				viewList
			}
		}



	}
</script>

<style>
	.u-status-bar.data-v-98bbdc6a {
		height: 0;
	}

	.wrap {
		padding: 40rpx;
	}
	.badge-icon {
			position: absolute;
			top: 14rpx;
			right: 40rpx;
			width: 80rpx;
			height: 80rpx;
		}
		
		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}
</style>
