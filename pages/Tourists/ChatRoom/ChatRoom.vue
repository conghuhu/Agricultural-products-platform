<template>
	<Nav title="聊天室" :isBack="true"></Nav>
	<view class="content">
		<scroll-view class="cu-chat" scroll-y="true" :scroll-into-view="scrollId" scroll-with-animation="true" style="height: 1400rpx;">
			<view v-for="(item,index) in chatList" :key="index" >
				<!--对方发送的信息-->
				<view class="cu-item" v-if="item.msgType === 'text'&&item.to==='mTOt'" :id="'msg'+item._id">
					<view class="cu-avatar radius">
						<u-avatar size="80" :src="item.m_userInfo.avatarUrl"></u-avatar>
					</view>
					<view class="main">
						<view class="content bg-cyan shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view class="date">{{dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
<<<<<<< HEAD
				<view class="cu-item" v-if="item.msgType === 'images'&&item.to==='mTOt'" :id="'msg'+item._id">
=======
				<view class="cu-item" v-if="item.msgType === 'images'&&item.to==='mTOt'">
>>>>>>> fd060d2742238468dcfbe1b9499b86d0346d3972
					<view class="cu-avatar radius">
						<u-avatar :src="item.m_userInfo.avatarUrl"></u-avatar>
					</view>
					<view class="main">
						<image :src="item.content" class="radius" mode="widthFix"></image>
					</view>
					<view class="date">{{dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
				<!--自己发送的信息-->
				<view class="cu-item self" v-if="item.msgType === 'text'&&item.to==='tTOm'" :id="'msg'+item._id">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view class="cu-avatar radius">
						<u-avatar :src="item.o_userInfo.avatarUrl"></u-avatar>
					</view>
					<view class="date">{{dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
<<<<<<< HEAD
				<view class="cu-item self" v-if="item.msgType === 'images'&&item.to==='tTOm'" :id="'msg'+item._id">
=======
				<view class="cu-item self" v-if="item.msgType === 'images'&&item.to==='tTOm'">
>>>>>>> fd060d2742238468dcfbe1b9499b86d0346d3972
					<view class="main">
						<image :src="item.content" class="radius" mode="widthFix"></image>
					</view>
					<view class="cu-avatar radius">
						<u-avatar :src="item.o_userInfo.avatarUrl"></u-avatar>
					</view>
					<view class="date">{{dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部输入 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<view class="input-box-flex">
				<!--弹出常用 -->
				<image class="icon_img" src="./static/images/reply.png" @click="oftenx"></image>
				<!-- 输入框 -->
				<view class="input-box-flex-grow"> <input type="text" class="contenxxt" id="input"
						v-model="formData.content" :hold-keyboard="true" :confirm-type="'send'" :confirm-hold="true"
						placeholder-style="color:#DDDDDD;" :cursor-spacing="10" /> </view>
				<!-- 选择表情包 -->
				<image class=" icon_btn_add" src="./static/images/expression.png" @click="exprec"></image>
				<!-- 发送消息按钮 -->
				<u-button type="primary" v-if="formData.content!==''" @click="sendContent">发送</u-button>
				<!-- <button class="send-out iconfont icon-fasong"  @click="sendout" v-if="formData.content!==''"></button> -->
				<!-- 弹出拍照-->
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
	import {
		ref,
		reactive
	} from 'vue'
	import request from '@/api/request';
	import dayjs from 'dayjs';
	export default {
		setup() {
			//定位ID
			const scrollId = ref("");
			//聊天列表
			const chatList = reactive([])
			//发送消息变量
			const messageData = reactive({
				m_openId: "",
				msgType: "",
				content: "",
				_createTime: ""

			})
			//表情包
			const emojisList = reactive([
				'😄', '😃', '😀', '😊', '😉', '😍', '😘', '😚', '😗',
				'😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒',
				'😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅',
				'😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖',
				'👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸',
				'👀', '👍', '👎', '👌', '👊', '✊', '✌', '👉', '👏',
				'💗', '💛', '💙', '💜', '💚', '❤', '💔', '💓', '💕',
				'🌟', '💢', '🏃', '🙅', '💁', '🙋', '💼', '💬', '💭',
			])
			//发送的聊天消息
			const formData = reactive({
				content: "",
				limit: 15,
				index: 1,
			})
			const newsList = reactive([])
			//是否展示功能型按钮
			const showFunBtn = ref(false)
			//是否展示常用
			const showOften = ref(false)
			//是否显示表情
			const showExpre = ref(false)
			//常用语
			const oftenTermList = reactive([{
					id: 0,
					title: "你好，很高兴",
				},
				{
					id: 0,
					title: "在吗",
				},
			])
			const oftenc = async function(e) {
				formData.content = e.title;
			}
			const oftenx = async function() {
				console.log(11111)
				showFunBtn.value = false; //隐藏功能
				showExpre.value = false; //隐藏表情
				showOften.value = !showOften.value; //显示常用
				uni.hideKeyboard();
			}
			const exprec = async function() {
				showFunBtn.value = false; //隐藏功能
				showOften.value = false; //隐藏常用
				showExpre.value = !showExpre.value; //显示表情
				uni.hideKeyboard();
			}
			//商家openid
			const m_openId = ref("");
			//选择表情
			async function expre(e) {
				formData.content = !formData.content ? e : formData.content + e;
			}
			//发送消息
			const sendContent = async function() {
				messageData.m_openId = m_openId.value;
				messageData.msgType = "text";
				messageData.content = formData.content;
				formData.content = ""
				const time = new Date();
				messageData._createTime = time;
				console.log(messageData)
				const res = await request("message", {
					type: "messageAdd",
					messageData: messageData
				})
				
			}
			//消息监听
			
			
			const initWatcher = async function(){
				const openId = await request("user",{
					type:"userOpenId",
				})
				const db = wx.cloud.database();
				const _ = db.command;
				const res = db.collection('chat-msgs').where({
					openId:openId.data,
					m_openId:m_openId.value
				}).watch({
					onChange:function(snapshot){
						console.log(snapshot)
						if(snapshot.docChanges.length!=0){
							snapshot.docChanges.forEach(item=>{
								if(item.dataType!="init"){
									item.t_read="1"
									chatList.push(item.doc)
								}
							})
							scrollId.value = chatList[chatList.length - 1]._id;
							console.log(chatList)
						}
					},
					onError:function(err) {
						console.error('the watch closed because of error', err)
					}
				})
				
			}
			

			return {
				emojisList,
				formData,
				newsList,
				showFunBtn,
				showOften,
				showExpre,
				oftenTermList,
				exprec,
				oftenc,
				oftenx,
				expre,
				m_openId,
				sendContent,
				messageData,
				chatList,
				initWatcher,
				dayjs,
				scrollId
			}
		},
		async onShow(value) {
			console.log(value)
			this.m_openId = value.m_openId
			const temp: {
				data: Array < any >
			} = await request("message", {
				type: "messageGet",
				m_openId: this.m_openId
			});
			this.chatList.length=0;
			for (let i = 0; i < temp.data.length; i++) {
				const item = temp.data[i];
				if(item.t_read=="0"){
					item.t_read = "1"
					const res = await request("message", {
						type: "messageUpdate",
						message: {
							...item
						}
					})
				}
				this.chatList.push(item);
			}
			this.scrollId ="msg"+ this.chatList[this.chatList.length - 1]._id;
			 this.initWatcher();
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f3f3;
	}

	.content {
		.cu-timeline {
			display: block;
			background-color: #ffffff;
		}
		.cu-timeline .cu-time {
			width: 120upx;
			text-align: center;
			padding: 20upx 0;
			font-size: 26upx;
			color: #888;
			display: block;
		}
		
		.cu-timeline .cu-time {
			width: 120upx;
			text-align: center;
			padding: 20upx 0;
			font-size: 26upx;
			color: #888;
			display: block;
		}

		.cu-chat {
			display: flex;
			flex-direction: column;
			padding-bottom: 200rpx;
		}

		.cu-chat .cu-item {
			display: flex;
			padding: 30upx 30upx 70upx;
			position: relative;
		}

		.cu-chat .cu-item>.cu-avatar {
			width: 80upx;
			height: 80upx;
		}

		.cu-chat .cu-item>.main {
			max-width: calc(100% - 260upx);
			margin: 0 40upx;
			display: flex;
			align-items: center;
		}

		.cu-chat .cu-item>image {
			height: 320upx;
		}

		.cu-chat .cu-item>.main .content {
			padding: 20upx;
			border-radius: 6upx;
			display: inline-flex;
			max-width: 100%;
			align-items: center;
			font-size: 30upx;
			position: relative;
			min-height: 80upx;
			line-height: 40upx;
			text-align: left;
		}

		.cu-chat .cu-item>.main .content:not([class*="bg-"]) {
			background-color: #ffffff;
			color: #333333;
		}

		.cu-chat .cu-item .date {
			position: absolute;
			font-size: 24upx;
			color: #8799a3;
			width: calc(100% - 320upx);
			bottom: 20upx;
			left: 160upx;
		}

		.cu-chat .cu-item .action {
			padding: 0 30upx;
			display: flex;
			align-items: center;
		}

		.cu-chat .cu-item>.main .content::after {
			content: "";
			top: 27upx;
			transform: rotate(45deg);
			position: absolute;
			z-index: 100;
			display: inline-block;
			overflow: hidden;
			width: 24upx;
			height: 24upx;
			left: -12upx;
			right: initial;
			background-color: inherit;
		}

		.cu-chat .cu-item.self>.main .content::after {
			left: auto;
			right: -12upx;
		}

		.cu-chat .cu-item>.main .content::before {
			content: "";
			top: 30upx;
			transform: rotate(45deg);
			position: absolute;
			z-index: -1;
			display: inline-block;
			overflow: hidden;
			width: 24upx;
			height: 24upx;
			left: -12upx;
			right: initial;
			background-color: inherit;
			filter: blur(5upx);
			opacity: 0.3;
		}

		.cu-chat .cu-item>.main .content:not([class*="bg-"])::before {
			background-color: #333333;
			opacity: 0.1;
		}

		.cu-chat .cu-item.self>.main .content::before {
			left: auto;
			right: -12upx;
		}

		.cu-chat .cu-item.self {
			justify-content: flex-end;
			text-align: right;
		}

		.cu-chat .cu-info {
			display: inline-block;
			margin: 20upx auto;
			font-size: 24upx;
			padding: 8upx 12upx;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 6upx;
			color: #ffffff;
			max-width: 400upx;
			line-height: 1.4;
		}

		.content bg-cyan shadow {}

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
