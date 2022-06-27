<template>
	<view v-if="shareInfo" class="card_container">
		<view class="shareCard" @click="gotoDetail">
			<view class="top_img">
				<u-lazy-load threshold="-100" imgMode="widthFix" :image="shareInfo.imageList[0]"
					:index="shareInfo._id" />

				<view v-if="shareInfo.goodInfo.length != 0" :class="location == 'left' ? 'left_good':'right_good'">
					<block v-if="location == 'left'">
						<view class="goodName">
							<Ellipsis :content="shareInfo.goodInfo[0].goodName" width="140" />
						</view>
						<u-image height="50rpx" width="50rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/good_icon.png?sign=1a345fd52aba9998de46d671090efe0a&t=1655993500">
						</u-image>
					</block>
					<block v-else>
						<u-image height="50rpx" width="50rpx" mode="aspectFit"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/good_icon.png?sign=1a345fd52aba9998de46d671090efe0a&t=1655993500">
						</u-image>
						<view class="goodName">
							<Ellipsis :content="shareInfo.goodInfo[0].goodName" width="140" />
						</view>
					</block>
				</view>


				<LocationBottom :value="shareInfo.locationVal" />
			</view>
			<view class="title">
				{{shareInfo.title}}
			</view>
			<view class="bottom">
				<view class="left">
					<u-avatar style="display: flex;align-items: center;" :size="25"
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
				default: null,
				required: false,
			},
			location: {
				type: String,
				default: 'left',
				required: false,
			}
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
			position: relative;

			.left_good {
				display: flex;
				align-items: center;

				max-width: 220rpx;
				height: 60rpx;

				padding-left: 5rpx;
				padding-right: 5rpx;

				border-radius: 0px 30rpx 30rpx 0px;
				background: rgba(0, 0, 0, 0.31);
				box-sizing: border-box;
				border: 0.5px solid #FFFFFF;

				position: absolute;

				top: 28rpx;
				left: 0;

				.goodName {
					margin-right: 10rpx;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}

			.right_good {

				display: flex;
				align-items: center;

				max-width: 220rpx;
				height: 60rpx;

				padding-left: 5rpx;
				padding-right: 5rpx;

				border-radius: 30px 0rpx 0rpx 30px;
				background: rgba(0, 0, 0, 0.31);
				box-sizing: border-box;
				border: 0.5px solid #FFFFFF;

				position: absolute;

				top: 28rpx;
				right: 0;

				.goodName {
					margin-left: 10rpx;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
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
