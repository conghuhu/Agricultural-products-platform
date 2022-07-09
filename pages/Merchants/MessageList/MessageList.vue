<template>
	<view class="fullScreen">
		<Nav title="消息列表" :isBack="true"></Nav>
		<view v-if="loading">
			<MyLoading></MyLoading>
		</view>
		<view class="content" v-else>
			<uni-list>
				<uni-list :border="true" v-for="(item,index) in showMessage">
					<!-- 右侧带角标 -->
					<uni-list-chat :clickable="true" :to="`../ChatRoom/ChatRoom?openId=${item.openId}`"
						:avatar-circle="true" :title="item.o_userInfo.nickName" :avatar="item.o_userInfo.avatarUrl"
						:note="item.content" :time="dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')"
						:badge-text="item.num" :badge-style="{backgroundColor:'#FF80AB'}"></uni-list-chat>
				</uni-list>
			</uni-list>
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
			//loading
			const loading = ref(true);
			//展示消息列表
			const showMessage = reactive([])
			//消息列表
			const messageList = reactive([]);
			//聊天数据监听
			const initWatcher = async function() {
				const openId = await request("user", {
					type: "userOpenId",
				})
				const db = wx.cloud.database();
				const _ = db.command;
				const res = db.collection('chat-msgs').where({
					m_openId: openId.data
				}).watch({
					onChange: function(snapshot) {
						console.log(snapshot)
						// if(snapshot.docChanges.length!=0){
						// 	snapshot.docChanges.forEach(item=>{
						// 		if(item.dataType!="init"){
						// 			chatList.push(item.doc)
						// 		}
						// 	})
						// 	console.log(chatList)
						// }
					},
					onError: function(err) {
						console.error('the watch closed because of error', err)
					}
				})
			}

			return {
				messageList,
				dayjs,
				showMessage,
				loading

			}
		},
		async onShow() {
			this.loading = true
			this.showMessage.length = 0;
			const res: {
				data: Array < any >
			} = await request("message", {
				type: "messageListGet",
			});
			console.log(res)
			this.messageList.length = 0;
			await res.data.forEach(item => {
				this.messageList.push(item);
			})
			const temp: {
				data: Array < any >
			} = await request("message", {
				type: "messageListCount"
			})
			console.log(temp)
			const idMap = reactive < Map < String,
				String >> (new Map());
			await temp.data.forEach(item => {
				console.log(item._id)
				idMap.set(item._id, "1");
				for (let i = 0; i < this.messageList.length; i++) {
					if (item._id === this.messageList[i].openId) {
						this.showMessage.push({
							...this.messageList[i],
							num: item.num
						})
						break;
					}
				}
			})
			console.log(this.messageList)
			for (let i = 0; i < this.messageList.length; i++) {
				if (idMap.get(this.messageList[i].openId) == null) {
					this.showMessage.push({
						...this.messageList[i],
					})
				}
				idMap.set(this.messageList[i].openId, "1");
			}
			console.log(this.showMessage)
			this.loading = false
		}
	};
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: $background-color;
		}
	}
</style>
