<template>
	<view class="fullScreen">
		<Nav title="消息列表" :isBack="true"></Nav>
		<uni-list>
			<uni-list :border="true" v-for="(item,index) in showMessage">
				<!-- 右侧带角标 -->
				<uni-list-chat :clickable="true" :to="`../ChatRoom/ChatRoom?m_openId=${item.m_openId}`" :avatar-circle="true"
					:title="item.m_userInfo.nickName" :avatar="item.m_userInfo.avatarUrl" :note="item.content"
					:time="dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')" :badge-text="item.num"
					:badge-style="{backgroundColor:'#FF80AB'}"></uni-list-chat>
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
				showMessage
			}
		},
		async onShow() {
			this.showMessage.length=0;
			const res: {
				data: Array < any >
			} = await request("message", {
				type: "messageListTouristsGet",
			});
			this.messageList.length=0;
			await res.data.forEach(item => {
				this.messageList.push(item);
			})
			const temp: {
				data: Array < any >
			} = await request("message", {
				type: "messageListTouristsCount"
			})
			const idMap = reactive<Map<String,String>>(new Map());
			await temp.data.forEach(item => {
				idMap.set(item._id,"1");
				for(let i = 0; i<this.messageList.length;i++){
					if(item._id===this.messageList[i].m_openId){
						this.showMessage.push({
							...this.messageList[i],
							num:item.num
						})
						break;
					}
				}
			});
			console.log(idMap)
			
			for(let i = 0;i<this.messageList.length;i++){
				if(idMap.get(this.messageList[i].m_openId)==null){
					this.showMessage.push({
						...this.messageList[i],
					})
				}
				idMap.set(this.messageList[i].m_openId,"1");
			}
			console.log(this.showMessage)
		}
	};
</script>

<style lang="scss" scoped>
</style>
