<template>
	<view class="fullScreen">
		<Nav title="消息列表" :isBack="true"></Nav>
		<uni-list>
			<uni-list :border="true" v-for="(item,index) in messageList">
				<!-- 右侧带角标 -->
				<uni-list-chat :clickable="true" to="../ChatRoom/ChatRoom" :avatar-circle="true" :title="item.o_userInfo.nickName"
					:avatar="item.o_userInfo.avatarUrl"	:note="item.content" :time="dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')" badge-text="12" :badge-style="{backgroundColor:'#FF80AB'}"
					></uni-list-chat>
			</uni-list>
		</uni-list>
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
				dayjs
			}
		},
		async onLoad() {
			const res: {
				data: Array < any >
			} = await request("message", {
				type: "messageListGet",
			});
			res.data.forEach(item=>{
				this.messageList.push(item);
			})
			console.log(this.messageList)
		}
	};
</script>

<style lang="scss" scoped>
</style>
