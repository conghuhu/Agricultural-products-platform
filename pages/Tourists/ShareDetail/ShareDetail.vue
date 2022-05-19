<template>
	<view class="fullScreen">
		<Nav title="详情" isBack></Nav>
		<view class="swiper_img">
			<u-swiper :list="shareDetail.imageList" imgMode="aspectFit" :height="1000" :autoplay="false"
				:borderRadius="0"></u-swiper>
		</view>
		<view class="content">
			<view class="title">
				{{shareDetail.title}}
			</view>
			<view class="desc">
				{{shareDetail.content}}
			</view>
			<view class="tool">
				<view class="location">
					<image style="width: 32rpx;height: 32rpx;margin-right: 4rpx;"
						src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location.png?sign=c1ea39e3c461e32946bed9fa5417d24f&t=1652769718"
						mode="aspectFit"></image>
					<Ellipsis :width="260" :content="shareDetail.locationVal" />
				</view>
				<view class="date">
					发布于 {{shareDetail.createTime}}
				</view>
			</view>
			<u-line color="#bdbcc0" />
			<view class="comments_list">
				<view class="comment_count">
					共{{shareDetail.comments}}条评论
				</view>
				<view class="comment_action">
					<u-avatar style="flex: 1;display: flex;align-items: center;" :size="60" :src="avatarUrl"></u-avatar>

					<view class="input_group">
						<view class="input_contain">
							<u-input v-model="commentVal" placeholder="留下你的精彩评论吧~" type="text" />
						</view>
						<view v-show="commentVal.length != 0" class="btn">
							<u-button type="primary" :customStyle="sendBtnStyle">发送</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="comment_input">
			</view>
			<view class="item_group">
				<MyStar :shareId="shareDetail._id" :star="shareDetail.star" @increment="updateStarCount('increment')"
					@decrement="updateStarCount('decrement')" />
			</view>
			<view class="item_group">
				<image v-if="isStar" style="width: 50rpx;height: 50rpx;" src="/static/images/star.png" mode="aspectFit"
					@click="clickStar" />
				<image v-else style="width: 50rpx;height: 50rpx;" src="/static/images/star_none.png" mode="aspectFit"
					@click="clickStar" />

				<view class="count">
					{{shareDetail.focus}}
				</view>
			</view>
			<view class="item_group">
				<image v-if="isStar" style="width: 50rpx;height: 50rpx;" src="/static/images/star.png" mode="aspectFit"
					@click="clickStar" />
				<image v-else style="width: 50rpx;height: 50rpx;" src="/static/images/star_none.png" mode="aspectFit"
					@click="clickStar" />

				<view class="count">
					{{shareDetail.comments}}
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	import dayjs from 'dayjs';
	import {
		userStore
	} from '@/stores/user';
	export default {
		setup() {
			const user = userStore();
			const avatarUrl = computed(() => {
				return user.userInfo.avatarUrl
			});
			const commentVal = ref('');
			const sendBtnStyle = ref({
				height: '60rpx'
			});
			const eventChannel = reactive({});
			const shareDetail = reactive({
				adcode: "",
				focus: 0,
				comments: 0,
				content: "",
				createTime: "",
				imageList: [],
				location: [],
				locationVal: "",
				star: 0,
				title: "",
				updateTime: "",
				_id: "",
				author: {
					avatarUrl: '',
					gender: 0,
					nickName: ''
				}
			});

			/**
			 * 更新star的数量
			 */
			const updateStarCount = (type: string) => {
				if (type == 'increment') {
					shareDetail.star++;
				} else if (type == 'decrement') {
					shareDetail.star--;
				}
				eventChannel.emit('updateStarCount', shareDetail.star);
			};

			return {
				user,
				shareDetail,
				avatarUrl,
				commentVal,
				sendBtnStyle,
				eventChannel,
				updateStarCount
			}
		},
		async onLoad(option) {
			Object.assign(this.eventChannel, this.getOpenerEventChannel());
			const res = await request('share', {
				type: 'getShareById',
				shareId: option.shareId
			});
			Object.assign(this.shareDetail, res.data);
			this.shareDetail.createTime = dayjs(res.data.createTime).format('YYYY-MM-DD HH:mm');
			console.log(res);
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		background-color: #F2F4F7;
		width: 100%;
		font-size: 32rpx;

		.content {
			padding: 20rpx;
			padding-bottom: 120rpx;
			background-color: #F2F4F7;

			.title {
				font-size: 34rpx;
				font-weight: 550;
			}

			.desc {
				margin-top: 20rpx;
				font-size: 30rpx;
			}

			.tool {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				margin-top: 30rpx;
				color: #949397;
				margin-bottom: 40rpx;

				.location {
					display: flex;
					align-items: center;
				}

				.date {}
			}

			.comments_list {
				margin-top: 40rpx;
				color: #8d8c8f;
				font-size: 26rpx;

				.comment_action {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;

					.input_group {
						flex: 7;
						display: flex;
						align-items: center;
						justify-content: space-around;

						.input_contain {
							flex: 6;
							background-color: #ededed;
							padding-left: 20rpx;
							border-radius: 20rpx;
						}

						.btn {
							flex: 1;
							margin-left: 20rpx;
						}
					}


				}
			}
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			z-index: 99;
			background-color: #ffffff;
			height: 100rpx;

			.comment_input {
				flex: 2;
			}

			.item_group {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.count {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
