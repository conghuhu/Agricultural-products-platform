<template>
	<Nav title="聊天室" :isBack="true"></Nav>
	<view class="content">
		<!-- 聊天渲染列表 -->
		<view style="height: 100vh;" @click='touchend'>
			<view v-for="item in newsList" :key="item">
				<text v-if="item.text">{{item.text}}</text>
				<image v-if="item.img" :src="item.img" mode="scaleToFill" class="touch-active" />
				<video v-if="item.video" :src="item.video"></video>
			</view>
		</view>
		<!-- 底部输入 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<view class="input-box-flex">
				<!--弹出常用 -->
				<image class="icon_img" src="./static/images/kefu.png"  @click="oftenx"></image>
				<!-- 输入框 -->
				<view class="input-box-flex-grow"> <input type="text" class="contenxxt" id="input"
						v-model="formData.content" :hold-keyboard="true" :confirm-type="'send'" :confirm-hold="true"
						placeholder-style="color:#DDDDDD;" :cursor-spacing="10" /> </view>
				<!-- 选择表情包 -->
				<image class=" icon_btn_add" src="./static/images/kefu.png"  @click="exprec"></image>
				<!-- 发送消息按钮 -->
				<text class="send-out iconfont icon-fasong" @click="sendout" v-if="formData.content!==''"></text>
				<!-- 弹出拍照-->
			</view>
			<!-- 弹出拍照-->
			<view class="fun-box" :class="{'show-fun-box':showFunBtn}">
				<u-grid :col="4" hover-class="contentType2-hover-class" :border="false">
					<u-grid-item v-for="(item, index) in funList" @click.stop="clickGrid(index)" :index="index"
						:key="index" bg-color="#f3f3f3">
						<u-icon :name="item.icon" :size="52"></u-icon>
						<view class="grid-text">{{ item.title }}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- 弹出常用聊天 -->
			<view class="fun-box1" :class="{'show-fun-box':showOften}">
				<scroll-view class="often-super" scroll-y="true">
					<view class="flex-row" v-for="item in oftenTermList" :key="item" @click.stop="oftenc(item)">
						<text class="often-text-size">{{item.title}}</text>
					</view>
				</scroll-view>
			</view>
			<!-- 弹出表情 -->
			<view class="fun-box2" :class="{'show-fun-box':showExpre}">
				<view class="emoji-box emoji-move-in">
					<scroll-view scroll-y="true" style="height:200px">
						<view class="list">
							<text v-for="(item,index) in emojisList" :key="index" @click.stop="expre(item)"
								class="touch-active">{{item}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	export default {
		data() {
			return {
				imgUrl22: this.$imgUrl22,
				mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
				//发送的聊天消息
				formData: {
					content: "",
					limit: 15,
					index: 1,
				},
				newsList: [],
				showFunBtn: false, //是否展示功能型按钮
				showOften: false, //是否展示常用
				showExpre: false, //是否显示表情
				//九宫格
				funList: [{
						icon: "photo-fill",
						title: "照片",
						uploadType: ["album"]
					},
					{
						icon: "camera-fill",
						title: "拍摄",
						uploadType: ["camera"]
					},
				],
				emojisList: [
					'😄', '😃', '😀', '😊', '😉', '😍', '😘', '😚', '😗',
					'😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒',
					'😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅',
					'😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖',
					'👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸',
					'👀', '👍', '👎', '👌', '👊', '✊', '✌', '👉', '👏',
					'💗', '💛', '💙', '💜', '💚', '❤', '💔', '💓', '💕',
					'🌟', '💢', '🏃', '🙅', '💁', '🙋', '💼', '💬', '💭',
				], //表情包
				//常用语
				oftenTermList: [{
						id: 0,
						title: "你好，很高兴",
					},
					{
						id: 0,
						title: "在吗",
					},
				],
			};
		},
		onLoad() {},
		methods: {
			touchend() {
				this.showFunBtn = false; //隐藏功能
				this.showExpre = false; //隐藏表情
				this.showOften = false; //隐藏常用
			},
			sendout() {
				this.newsList.push({
					text: this.formData.content
				})
				// let data = this.formData.content
				// this.$socket.send(JSON.stringify(data));
				this.formData.content = '' //清空输入框的文本
			},
			//输入常用消息
			oftenc(e) {
				this.formData.content = e.title;
			},
			//选择表情
			expre(e) {
				this.formData.content = !this.formData.content ? e : this.formData.content + e;
			},
			//切换功能性按钮
			switchFun() {
				this.showOften = false; //隐藏常用
				this.showExpre = false; //隐藏表情
				this.showFunBtn = !this.showFunBtn; //显示功能
				uni.hideKeyboard();
			},
			//是否展示常用
			oftenx() {
				this.showFunBtn = false; //隐藏功能
				this.showExpre = false; //隐藏表情
				this.showOften = !this.showOften; //显示常用
				uni.hideKeyboard();
			},
			//是否展示表情
			exprec() {
				this.showFunBtn = false; //隐藏功能
				this.showOften = false; //隐藏常用
				this.showExpre = !this.showExpre; //显示表情
				uni.hideKeyboard();
			},
			//点击宫格时触发
			clickGrid(index) {
				if (index == 0) {
					this.chooseImage(["album"]);
				} else if (index == 1) {
					this.chooseImage(["camera"]);
				}
			},
			//发送图片
			chooseImage(sourceType) {
				console.log(sourceType, "sourceType");
				uni.chooseImage({
					sourceType,
					sizeType: ["compressed"],
					success: (res) => {
						console.log(res, "kkkk");
						this.showFunBtn = false;
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							const params = {
								contentType: 3,
								content: res.tempFilePaths[i],
							};
							this.newsList.push({
								img: res.tempFilePaths[i]
							})
							console.log(this.newsList, '图片');
						}
					},
				});
			},
			//用户触摸屏幕的时候隐藏键盘
			touchstart() {
				uni.hideKeyboard();
			},
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f3f3;
	}

	.content {
		.input-box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: content-box;
			z-index: 999;
			background-color: #f3f3f3;
			/* #ifdef APP-PLUS */
			margin-bottom: 0rpx;
			margin-bottom: constant(safe-area-inset-bottom);
			margin-bottom: env(safe-area-inset-bottom);
			/* #endif */
			/* #ifdef MP-WEIXIN */
			padding-bottom: 0rpx;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			/* #endif */

			.input-box-flex {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: nowrap;
				flex-direction: row;
				padding: 20rpx;
				box-sizing: border-box;

				image {
					width: 63rpx;
					height: 63rpx;
				}

				.icon_img {
					margin-right: 20rpx;
				}

				.icon_btn_add {
					margin-left: 20rpx;
				}

				.send-out {
					font-size: 65rpx;
					margin-left: 15rpx;
					color: #16c694;
				}

				.input-box-flex-grow {
					flex: 1;
				}

				.contenxxt {
					box-sizing: border-box;
					background-color: #fff;
					height: 80rpx;
					padding: 0 20rpx;
					border-radius: 12rpx;
					font-size: 28rpx;
					caret-color: $uni-color-success;
				}
			}

			.fun-box {
				opacity: 0;
				transition: all 0.1s ease-in-out;
				height: 0;

				.grid-text {
					padding-top: 10rpx;
					color: $uni-text-color-grey;
				}
			}

			.fun-box1 {
				opacity: 0;
				transition: all 0.1s ease-in-out;
				height: 0;

				.often-super {
					padding: 30rpx;
					height: 240rpx;
					background-color: #f3f3f3;
					width: auto;

					.flex-row {
						padding: 10rpx 0;
						border-bottom: 1rpx #e8e8e8 solid;

						.often-text-size {
							color: #5a5a5a;
							font-size: 26rpx;
							margin-top: 6rpx;
							margin-bottom: 6rpx;
						}
					}
				}
			}

			.fun-box2 {
				opacity: 0;
				transition: all 0.1s ease-in-out;
				height: 0;

				.emoji-box {
					position: relative;
					height: 200rpx;
					padding: 5rpx 0;
					box-sizing: border-box;
					margin-bottom: -200rpx;
					background-color: #f3f3f3;

					.list {
						display: flex;
						flex-wrap: wrap;
						padding: 0 0 0 14rpx;
						padding-bottom: constant(safe-area-inset-bottom);
						padding-bottom: env(safe-area-inset-bottom);

						.touch-active {
							width: 65rpx;
							height: 60rpx;
							text-align: center;
							border-radius: 3rpx;
							line-height: 60rpx;
							font-size: 38rpx;
						}
					}
				}

				.emoji-move-in {
					-webkit-animation: emoji-move-in 0.3s forwards;
					animation: emoji-move-in 0.3s forwards;
				}
			}

			.show-fun-box {
				opacity: 1;
				height: 300rpx;
			}
		}

		.input-box-mpInputMargin {
			/* #ifdef MP-WEIXIN */
			padding-bottom: 0rpx;
			/* #endif */
		}
	}
</style>
