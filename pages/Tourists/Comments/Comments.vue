<template>
	<view class="fullScreen">
		<Nav title="发表评论" :isBack="true"></Nav>
		<view class="card">
			<view class="good">
				<view class="goodImage">
					<image style="width: 8vh; height: 8vh;" :src="goodInfo.imageShowList[0]"></image>
				</view>
				<view class="goodInfo">
					<view class="title">{{goodInfo.goodName}}</view>
					<view class="introduce">{{goodInfo.description}}</view>
				</view>
			</view>
			<view class="description">
				<view class="left">描述相符</view>
				<view class="rate">
					<u-rate :count="5" size="38" gutter="16" v-model="startCount"></u-rate>
				</view>
				<view class="right">{{descriptionInfo[startCount-1]}}</view>
			</view>
			<view class="tag">
				<view class="tagForeach" v-for="(item,index) in tagInfo">
					<u-tag :text="item.title" :bgColor="item.color" shape="circle" type="info"
						@click="clickTag(index)" />
				</view>
			</view>
			<view class="comment">
				<view class="title">详细评论</view>
				<view class="content">
					<u-input v-model="content" type="textarea" placeholder="留下你的评论吧" />
				</view>
			</view>
			<view class="upLoad">
				<view class="title">图片评论</view>
				<view class="upLoadImage">
					<u-upload @on-choose-complete="chooseComplete" @on-remove="removeImg" :auto-upload="false"
						:max-size="5 * 1024 * 1024" max-count="6" uploadText="上传评论图片"></u-upload>
				</view>
			</view>
		</view>
		<view class="submit">
			<u-button type="success" shape="circle" @click="sentComment">发布评论</u-button>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import request from '@/api/request';
	import dayjs from 'dayjs';
	import getUUID from '@/utils/getUUID';
	export default {
		setup() {
			const eventChannel = reactive({});
			const orderId = ref("");
			const color = ref("");
			//产品ID
			const goodId = ref("");
			//产品详细信息
			const goodInfo = ref({
				imageShowList: []
			});
			//描述相关
			const startCount = ref(4)
			//相符结果
			const descriptionInfo = reactive([
				"非常差", "差", "一般", "好", "非常好"
			])
			//标签内容化
			const tagInfo = reactive([{
					title: "产品质量优",
					color: "#f4f6f8"

				},
				{
					title: "配送速度快",
					color: "#f4f6f8"

				},
				{
					title: "包装质量好",
					color: "#f4f6f8"

				},
				{
					title: "外观品质高",
					color: "#f4f6f8"

				},
				{
					title: "口感味道好",
					color: "#f4f6f8"

				},
			])
			//产品评论
			const content = ref("");
			//上传评论
			const form = reactive({
				goodId: "",
				startCount: Number,
				tagContent: [],
				content: "",
				imageList: [],
			})
			/**
			 * 当选择的图片发生改变时
			 */
			const chooseComplete = async (tempFileLists: Array < {
				url: string
			} > ) => {
				form.imageList.length = 0;
				tempFileLists.forEach(item => {
					form.imageList.push(item.url);
				})
				console.log(form.imageList)
			}
			//标签点击
			const tagMap = reactive < Map < String,
				Number >> (new Map());
			const clickTag = async (index) => {
				if (tagInfo[index].color == "#f4f6f8") {
					tagMap.set(tagInfo[index].title, index)
					tagInfo[index].color = "#ff0000"
				} else {
					tagMap.delete(tagInfo[index].title)
					tagInfo[index].color = "#f4f6f8"
				}
			}
			/**
			 * 移出图片
			 */
			const removeImg = async (index, lists) => {
				form.imageList.splice(index, 1);
			}
			//提交评论
			const sentComment = async () => {
				uni.showLoading({
					title: "提交中"
				});
				form.goodId = goodId.value;
				form.startCount = startCount.value;
				form.content = content.value;
				for (let tag of tagMap.keys()) {
					form.tagContent.push(tag)
				}
				const fileList = await Promise.all(form.imageList.map(item => {
					return wx.cloud.uploadFile({
						cloudPath: 'commentImage/' + new Date().getTime() +
							getUUID() + 'img.jpg',
						filePath: item,
					})
				}));
				form.imageList.length = 0;
				fileList.forEach(item => {
					form.imageList.push(item.fileID);
				});
				const res = await request("comments", {
					type: "addGoodsComments",
					goodsComments: {
						...form
					}
				})
				const goodItem = ref({
					orderId: orderId.value,
					goodId: goodId.value
				})
				const temp = await request("order", {
					type: "completeOrderComment",
					goodItem: goodItem.value
				});
				uni.hideLoading();
				wx.showToast({
					title: '发表评论成功',
					duration: 1000
				});
				// 触发上级刷新
				eventChannel.emit('refresh', {
					data: {}
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
			return {
				goodInfo,
				startCount,
				descriptionInfo,
				tagInfo,
				content,
				form,
				chooseComplete,
				removeImg,
				sentComment,
				goodId,
				clickTag,
				color,
				tagMap,
				orderId,
				eventChannel
			}
		},
		async onLoad(data) {
			Object.assign(this.eventChannel, this.getOpenerEventChannel());

			this.goodId = data.id;
			this.orderId = data.orderId;
			console.log(this.orderId)
			const res = await request("goods", {
				type: "getGoodById",
				goodId: data.id
			})
			Object.assign(this.goodInfo, res.data);
			console.log(this.goodInfo)
		}

	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.card {
			padding: 20rpx;
			margin-top: 15rpx;
			margin-left: 15rpx;
			margin-right: 15rpx;
			background: #ffffff;
			color: #FFFFFF;
			padding: 4rpx 14rpx;
			border-radius: 20rpx;
			box-shadow: 0px 10rpx 15rpx 0px rgba(27, 28, 32, 0.05);

			.good {
				display: flex;
				align-content: center;

				.goodImage {}

				.goodInfo {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.title {
						color: #000000;
						font-size: 36rpx;
						font-weight: 550;
					}

					.introduce {
						margin-top: 20rpx;
						color: #000000;
						font-size: 22rpx;
						font-weight: 500;

					}
				}
			}

			.description {
				display: flex;
				align-items: center;
				margin-top: 26rpx;

				.left {
					font-size: 36rpx;
					font-weight: 550;
					margin-left: 10rpx;
					color: #000000;
				}

				.rate {
					margin-left: 20rpx;
				}

				.right {
					font-size: 36rpx;
					font-weight: 500;
					margin-left: 10rpx;
					color: #9b9b9b;
				}
			}

			.tag {
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;

				.tagForeach {
					margin-left: 10rpx;
					margin-top: 4rpx;

				}

			}

			.comment {
				margin-top: 20rpx;
				display: flex;
				align-items: center;

				.title {
					font-size: 36rpx;
					font-weight: 550;
					margin-left: 10rpx;
					color: #000000;
				}

				.content {
					margin-left: 10rpx;
					width: 70%;
				}
			}

			.upLoad {
				margin-top: 20rpx;
				display: flex;
				align-items: center;

				.title {
					font-size: 36rpx;
					font-weight: 550;
					margin-left: 10rpx;
					color: #000000;
				}

				.upLoadImage {}
			}
		}

		.submit {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 120rpx;
			background-color: #F2F4F7;
			align-items: center;
			justify-content: center;
		}
	}
</style>
