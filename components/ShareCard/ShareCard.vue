<template>
	<view class="shareCard">
		<view class="top_img">
			<u-lazy-load threshold="-100" imgMode="widthFix" :image="item.imageList[0]" :index="item._id" />
		</view>
		<view class="title">
			{{item.title}}
		</view>
		<view class="bottom">
			<view class="left">
				<u-avatar style="display: flex;align-items: center;" :size="40" :src="item.author[0].avatarUrl">
				</u-avatar>
				<view class="nickname">
					{{item.author[0].nickName}}
				</view>
			</view>
			<view class="right">

				<image v-if="isStar" style="width: 42rpx;height: 42rpx;" src="/static/images/star.png" mode="aspectFit"
					@click="clickStar" />
				<image v-else style="width: 42rpx;height: 42rpx;" src="/static/images/star_none.png" mode="aspectFit"
					@click="clickStar" />

				<view class="star_count">
					{{item.star}}
				</view>
			</view>
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
	import {
		userStore
	} from '@/stores/user';
	export default {
		props: {
			// 检测类型
			item: {
				type: Object,
				default: {},
				required: true,
			},
		},
		setup(props) {
			const user = userStore();
			const isStar = ref(false);
			const clickStar = async () => {
				isStar.value = !isStar.value;
				if (isStar.value) {
					props.item.star += 1;
					// 点赞
					const res = await request('star_focus', {
						type: 'addStar',
						shareId: props.item._id
					})
					user.addToLikeShareSet(props.item._id);
				} else {
					props.item.star -= 1;
					// 取消点赞
					const res = await request('star_focus', {
						type: 'removeStar',
						shareId: props.item._id
					})
					user.removeFromLikeShareSet(props.item._id);
				}
			};
			onMounted(() => {
				isStar.value = user.likeShareSet.has(props.item._id);
			});
			return {
				isStar,
				clickStar,
				user
			}
		},
	}
</script>

<style lang="scss" scoped>
	.shareCard {
		width: 100%;
		background-color: white;
		border-radius: 16rpx;
		overflow: hidden;

		.top_img {
			width: 100%;
		}

		.title {
			width: 100%;
			padding: 20rpx;
			font-size: 32rpx;
			font-weight: 550;
		}

		.bottom {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 12rpx 20rpx 16rpx;

			.left {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.nickname {
					font-size: 28rpx;
					margin-left: 6rpx;
					color: #949397;
				}
			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;

				.star_count {
					font-size: 28rpx;
					margin-left: 6rpx;
					color: #949397;
				}
			}
		}
	}
</style>
