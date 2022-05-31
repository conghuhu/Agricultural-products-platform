<template>
	<view class="fullScreen">
		<Nav title="选择地址" isBack></Nav>

		<view class="top_tool">
			<view style="flex: 6;">
				<u-search bg-color="#f2f2f2" placeholder="请输入位置" v-model="keyword" @change="search"></u-search>
			</view>
			<view style="flex: 1;">
				<u-button :customStyle="btnStyle" :hairLine="false" @click="insertAdress()" type="success"
					shape="circle">新增地址</u-button>
			</view>
		</view>
		<view class="content">
			<view v-for="(res, index) in infoAddress" :key="res._id">
				<view class="item" @click="goToHome(res)">
					<view class="top">
						<view class="name">{{ res.consignee }}</view>
						<view class="phone">{{ res.phone }}</view>
					</view>
					<view class="bottom">
						<view>
							{{res.location}}
						</view>
						<view class="right">
							<view style="padding: 10rpx;" @click.stop="updateAdress(index)">
								<u-icon style="margin-right: 20rpx;" name="edit-pen" :size="40" color="#999999">
								</u-icon>
							</view>
							<view style="padding: 10rpx;" @click.stop="deleteAdress(index)">
								<u-icon name="trash" :size="40" color="#999999"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view>
				<u-action-sheet :list="sheetList" v-model="listShow" @click="confirmDel"></u-action-sheet>
			</view>
		</view>

		<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>

	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	export default {
		setup() {
			const user = userStore();
			//tabbar
			const list = reactive(navList)
			async function rightClick() {
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

			const btnStyle = reactive({
				height: '50rpx',
				marginRight: '10rpx',
				marginLeft: '10rpx',
				width: '160rpx'
			});


			//删除用户地址信息
			const sheetList = ref([{
				text: '确定',
				color: 'red',
				fontSize: 28
			}])
			const listShow = ref(false)
			const temp = ref("")
			async function deleteAdress(index) {
				listShow.value = true
				temp.value = infoAddress[index]._id
				console.log(temp.value)

			}
			async function confirmDel(index) {
				console.log(temp.value)

				if (index === 0) {
					await request("touristInfo", {
						type: "delAddress",
						ID: temp.value
					});
					uni.redirectTo({
						url: "../Location/Location"
					})
				}

			}

			const goToHome = (item) => {
				user.updateLocationInfo(item.adress, item.locationArr.coordinates[1], item.locationArr.coordinates[
					0]);
				uni.navigateBack();
			}

			return {
				list,
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
				btnStyle,
				goToHome
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
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F2F4F7;
		position: relative;

		.top_tool {
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.content {
			background-color: #F2F4F7;
		}
	}

	.u-status-bar.data-v-98bbdc6a {
		height: 0;
	}

	.item {
		padding: 40rpx 20rpx;
		background-color: white;

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
			align-items: center;

			.right {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
