<template>
	<view class="fullScreen">
		<Nav title="详情" isBack></Nav>

		<view v-if="loading"
			style="width: 100%;height: 70vh;display: flex;align-items: center;justify-content: center;">
			<MyLoading />
		</view>

		<view v-else>
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
						<u-avatar style="flex: 1;display: flex;align-items: center;" :size="60" :src="avatarUrl">
						</u-avatar>

						<view class="input_group">
							<view class="input_contain">
								<u-input v-model="commentVal" placeholder="留下你的精彩评论吧~" type="text" />
							</view>
							<view v-show="commentVal.length != 0" class="btn">
								<u-button type="primary" :customStyle="sendBtnStyle" @click="sendComments">发送</u-button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="person_comment">
				<view class="comment_show" v-for="item in commentList" :key="item._id">
					<view class="show_top">
						<view class="show_left">
							<u-avatar style="flex: 1;display: flex;align-items: center;" :size="60"
								:src="item.author.avatarUrl">
							</u-avatar>
						</view>
						<view class="show_right">
							<view class="right_top">
								{{item.createTime}}
							</view>
							<view class="right_content">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="show_bottom">
						<u-line length="720rpx" color="#b9b9b9" />
					</view>

				</view>
			</view>
			<view class="bottom">
				<view class="comment_input">
				</view>
				<view class="item_group">
					<MyStar :shareId="shareDetail._id" :star="shareDetail.star"
						@increment="updateStarCount('increment')" @decrement="updateStarCount('decrement')" />
				</view>
				<view class="item_group">
					<image style="width: 42rpx;height: 42rpx;" src="/static/images/comment.png" mode="aspectFit"
						@click="clickStar" />
					<view class="count">
						{{shareDetail.comments}}
					</view>
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
			//评论内容信息
			const comment = reactive({
				adcode: "",
				content: "",
				comment_id: "",
				author: {}
			})

			const loading = ref(true);

			async function sendComments() {
				comment.adcode = shareDetail.adcode,
					comment.content = commentVal.value,
					comment.comment_id = shareDetail._id,
					console.log(user.userInfo)
				Object.assign(comment.author, user.userInfo),
					console.log(comment)
				const result = await request("comments", {
					type: "addComments",
					comment: comment
				})
				commentVal.value = ""
				await getComments();
			}

			const commentList = reactive([])

			async function getComments() {
				const result: {
					data: Array < any >
				} = await request("comments", {
					type: "getComments",
					id: shareDetail._id
				})
				console.log(result)
				commentList.length = 0;
				result.data.forEach(item => {
					const time = dayjs(item.createTime).format('YYYY-MM-DD HH:mm');
					item.createTime = time;
					commentList.push(item);
				});
				shareDetail.comments = commentList.length;
			}



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
			}


			return {
				user,
				shareDetail,
				avatarUrl,
				commentVal,
				sendBtnStyle,
				eventChannel,
				updateStarCount,
				getComments,
				commentList,
				sendComments,
				loading
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
			await this.getComments();

			this.loading = false;
		},
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		background-color: $background-color;
		width: 100%;

		.person_comment {
			padding-bottom: 200rpx;
			background-color: $background-color;

			.comment_show {
				margin-top: 24rpx;
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: column;
				padding-bottom: 50rpx;
				height: 15vw;

				.show_top {
					flex: 9;
					display: flex;
					align-items: center;
					justify-content: space-around;
					width: 100%;

					.show_left {
						margin-left: 20rpx;
						flex: 1;
						height: 100%;
					}

					.show_right {
						height: 100%;
						margin-right: 20rpx;
						flex: 7;
						display: flex;
						align-items: center;
						flex-direction: column;

						.right_top {
							width: 100%;
							font-size: 26rpx;
							color: #949397;
							flex: 2;
						}

						.right_content {

							white-space: normal;
							word-break: break-all;
							word-wrap: break-word;
							width: 100%;
							font-size: 32rpx;
							font-weight: 500rpx;
							flex: 8;
						}
					}
				}

				.show_bottom {
					padding-top: 24rpx;
					flex: 1;
					height: 1vw;
				}

			}
		}

		.content {
			padding: 20rpx;
			padding-bottom: 50rpx;
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
				flex: 3;
			}

			.item_group {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.count {
					margin-left: 10rpx;
					font-size: 28rpx;
					color: #949397;
				}
			}
		}

		.comment {
			display: flex;
			padding: 30rpx;

			.left {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.right {
				flex: 1;
				padding-left: 20rpx;
				font-size: 30rpx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 10rpx;

					.name {
						color: #5677fc;
					}

					.like {
						display: flex;
						align-items: center;
						color: #9a9a9a;
						font-size: 26rpx;

						.num {
							margin-right: 4rpx;
							color: #9a9a9a;
						}
					}

					.highlight {
						color: #5677fc;

						.num {
							color: #5677fc;
						}
					}
				}

				.content {
					margin-bottom: 10rpx;
				}

				.reply-box {
					background-color: rgb(242, 242, 242);
					border-radius: 12rpx;

					.item {
						padding: 20rpx;
						border-bottom: solid 2rpx $u-border-color;

						.username {
							font-size: 24rpx;
							color: #999999;
						}
					}

					.all-reply {
						padding: 20rpx;
						display: flex;
						color: #5677fc;
						align-items: center;

						.more {
							margin-left: 6rpx;
						}
					}
				}

				.bottom {
					margin-top: 20rpx;
					display: flex;
					font-size: 24rpx;
					color: #9a9a9a;

					.reply {
						color: #5677fc;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
