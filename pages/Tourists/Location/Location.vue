<template>
	<view>
		<view>
			<u-navbar title="选择地址" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
				</view>
			</u-navbar>
		</view>


		<view style="display: flex;justify-content: space-between;align-items: center; margin-top: 10px;">
			<view style="flex: 5;">
				<u-search bg-color="#f2f2f2" placeholder="请输入位置" v-model="keyword" @change="search()"></u-search>
			</view>
			<view style="flex: 1;">
				<u-button :hairLine="false" @click="insertAdress()" type="success" shape="circle">新增地址</u-button>
			</view>
		</view>

		<view class="item" v-for="(res, index) in infoAddress" :key="res._id">
			<view class="top">
				<view class="name">{{ res.consignee }}</view>
				<view class="phone">{{ res.phone }}</view>
			</view>
			<view class="bottom">
				{{res.location}}
				<u-icon name="edit-pen" :size="40" color="#999999" @click="updateAdress(index)"></u-icon>
				<u-icon name="trash" :size="40" color="#999999" @click="deleteAdress(index)"></u-icon>
			</view>
		</view>
		<view>
			<u-action-sheet :list="sheetList" v-model="listShow" @click="confirmDel"></u-action-sheet>
		</view>

		<view>
			<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	export default {
		setup() {
			//tabbar
			const list = reactive(navList)
			//页面nav信息配置
			const current = ref(0);
			const background = ref({
				backgroundColor: '#001f3f',

				// 导航栏背景图
				background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			})
			async function rightClick() {
				console.log(11111)
				uni.navigateBack({})
			}
			const keyword = ref("")
			async function search() {
				await wx.startLocationUpdateBackground("gcj02")
				const {
					latitude,
					longitude
				} = await wx.getLocation();
				const res = await wx.choosePoi(2, latitude, longitude);
				console.log(res)
			}

			async function insertAdress() {
				await uni.navigateTo({
					url: "../ShippingAddress/ShippingAddress"
				})
			}
			//获取用户历史地址信息
			const infoAddress = reactive([])

			//更新用户历史地址信息
			async function updateAdress(index) {
				console.log(infoAddress[index])
				await uni.navigateTo({
					url: "../ShippingAddress/ShippingAddress?addressInfo=" + JSON.stringify(infoAddress[
						index]),
				})
			}


			//删除用户地址信息
			const sheetList = ref([{
				text: '确定',
				color: 'red',
				fontSize: 28
			}])
			const listShow = ref(false)
			const temp = ref("")
			async function deleteAdress(index) {
				console.log(222222)
				listShow.value = true
				temp.value = infoAddress[index]._id
				console.log(temp.value)
				
			}
			async function confirmDel(index) {
				console.log(temp.value)
				
				if (index === 0) {
					console.log(11111)
					request("touristInfo", {
						type: "delAddress",
						ID: temp.value
					})
				}
				uni.redirectTo({
					url: "../Location/Location"
				})
			}

			return {
				list,
				current,
				background,
				rightClick,
				keyword,
				search,
				insertAdress,
				infoAddress,
				updateAdress,
				deleteAdress,
				sheetList,
				listShow,
				confirmDel,
			}
		},
		async onShow() {
			const temp: {
				res: Array < any >
			} = await request("touristInfo", {
				type: "getAddress"
			})
			this.infoAddress.length = 0;
			temp.res.forEach(item => {
				this.infoAddress.push(item);
			})
		}



	}
</script>

<style scoped lang="scss">
	.u-status-bar.data-v-98bbdc6a {
		height: 0;
	}

	.item {
		padding: 40rpx 20rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}
</style>
