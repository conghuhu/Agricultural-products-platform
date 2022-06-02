<template>
	<view v-if="item" class="goodCard" @click="goToDetail(item)">
		<u-lazy-load threshold="10" border-radius="10" :image="item.imageShowList[0]" :index="item._id">
		</u-lazy-load>
		<view class="demo-title">
			{{item.goodName}}
		</view>
		<view class="demo-price">
			{{item.goodPrice}}元
		</view>
		<view class="demo-tag">
			<view class="demo-tag-owner">
				自营
			</view>
			<view class="demo-tag-text">
				放心购
			</view>
		</view>
		<view class="demo-shop">
			<view>
				{{item.originPlace}}
			</view>
			<view class="bottom_right" @click.stop="addToWant">
				<u-image height="100%" width="100%" mode="aspectFit" src="/static/images/upload.png">
				</u-image>
				<uni-transition mode-class="fade" :show="count>0" @change="change">
					<u-badge type="error" :count="count" :isCenter="true"></u-badge>
				</uni-transition>
			</view>

		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed,
		nextTick
	} from 'vue';
	import {
		userStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	import request from '@/api/request';
	export default {
		props: {
			// 检测类型
			item: {
				type: Object,
				default: null,
				required: false,
			},
		},
		setup(props) {
			const user = userStore();
			const {
				wantingGoods
			} = storeToRefs(user);


			const count = computed(() => {
				const exist = wantingGoods.value.has(props.item._id);
				if (exist) {
					return wantingGoods.value.get(props.item._id);
				} else {
					return 0;
				}
			});

			const goToDetail = async (item) => {
				// uni.navigateTo({
				// 	url: `/pages/Merchants/GoodDetail/GoodDetail?goodId=${item._id}`
				// })
				console.log(item);
			};

			/**
			 * 添加想要
			 */
			const addToWant = async (e) => {
				user.incrementWantedGood(props.item._id);
				const res = await request('wanted', {
					type: 'addWanted',
					goodId: props.item._id,
					count: count.value
				});
			};


			const change = () => {
				// console.log('触发动画')
			}


			return {
				goToDetail,
				addToWant,
				count,
				addToWant,
				change
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodCard {
		border-radius: 8px;
		margin: 8rpx;
		margin-bottom: 20rpx;
		position: relative;
		background: #F9FAFB;
		box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.03);

		.demo-image {
			width: 100%;
			border-radius: 4px;
		}

		.demo-title {
			font-size: 34rpx;
			margin-top: 10rpx;
			color: $u-main-color;
			font-weight: 520;
			padding: 6rpx 12rpx 6rpx 12rpx;
		}

		.demo-tag {
			display: flex;
			padding: 6rpx 12rpx 6rpx 12rpx;
		}

		.demo-price {
			font-size: 32rpx;
			color: $u-type-error;
			padding: 6rpx 12rpx 6rpx 12rpx;
		}

		.demo-shop {
			font-size: 28rpx;
			color: $u-tips-color;
			padding: 6rpx 12rpx 12rpx 12rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.bottom_right {
				width: 60rpx;
				height: 60rpx;
				margin: 6rpx;
				transform: translate(-6rpx, -10rpx);
				position: relative;
			}
		}
	}
</style>
