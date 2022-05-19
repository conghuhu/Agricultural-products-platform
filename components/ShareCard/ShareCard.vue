<template>
	<view class="card_container">
		<view class="shareCard" @click="gotoDetail">
			<view class="top_img">
				<u-lazy-load threshold="-100" imgMode="widthFix" :image="shareInfo.imageList[0]"
					:index="shareInfo._id" />
			</view>
			<view class="title">
				{{shareInfo.title}}
			</view>
			<view class="bottom">
				<view class="left">
					<u-avatar style="display: flex;align-items: center;" :size="40"
						:src="shareInfo.author[0].avatarUrl">
					</u-avatar>
					<view class="nickname">
						{{shareInfo.author[0].nickName}}
					</view>
				</view>
				<MyStar :shareId="shareInfo._id" :star="shareInfo.star" @increment="shareInfo.star++"
					@decrement="shareInfo.star--" />
			</view>
		</view>
	</view>

</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted,
		toRefs
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
			const {
				item: shareInfo
			} = toRefs(props);
			const user = userStore();
			const gotoDetail = () => {
				uni.navigateTo({
					url: `/pages/Tourists/ShareDetail/ShareDetail?shareId=${shareInfo.value._id}`,
					events: {
						updateStarCount: function(data) {
							console.log(data);
							shareInfo.value.star = data;
						}
					}
				});
			}

			return {
				user,
				gotoDetail,
				shareInfo
			}
		},
	}
</script>

<style lang="scss" scoped>
	.card_container {
		padding: 10rpx;
	}

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

		}
	}
</style>
