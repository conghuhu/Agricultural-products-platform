<template>
	<view class="fullScreen">
		<Nav title="创建店铺" isBack />
		<view class="content">
			<u-form :labelWidth="160" :model="createShopForm" ref="createShopFormRef">
				<u-form-item label="用户名" prop="username">
					<u-input v-model="createShopForm.username" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item label="手机号" prop="phone">
					<u-input v-model="createShopForm.phone" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="商铺名" prop="shopName">
					<u-input v-model="createShopForm.shopName" placeholder="请输入商铺名" />
				</u-form-item>
				<u-form-item label="简介" prop="description">
					<u-input v-model="createShopForm.description" type="textarea" placeholder="请输入商铺简介" />
				</u-form-item>
				<u-form-item label="店铺头像" prop="shopAvatar">
					<u-upload @on-choose-complete="chooseComplete" @on-remove="removeImg" :auto-upload="false"
						:max-size="5 * 1024 * 1024" max-count="1"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<view class="submit">
			<u-button type="primary" @click="submitCreateShop">创建</u-button>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	import request from '@/api/request';
	import dayjs from "dayjs";
	import {
		userStore
	} from '@/stores/user';
	import getUUID from '@/utils/getUUID';
	export default {
		setup() {
			const user = userStore();
			/**
			 * 创建表单ref
			 */
			let createShopFormRef = ref(null);

			const createShopForm = reactive({
				username: '',
				phone: '',
				shopName: '',
				description: '',
				shopAvatar: ''
			});

			const rules = ref({
				username: [{
					required: true,
					message: '请输入姓名',
					// 可以单个或者同时写两个触发验证方式 
					trigger: ['change', 'blur'],
				}],
				phone: [{
					required: true,
					min: 11,
					message: '请输入正确的手机号',
					trigger: 'blur'
				}],
				shopName: [{
					required: true,
					message: '给你的商铺起个名字叭~',
				}],
			})

			/**
			 * 当选择的图片发生改变时
			 */
			const chooseComplete = async (tempFileLists: Array < {
				url: string
			} > ) => {
				console.log(tempFileLists);
				createShopForm.shopAvatar = tempFileLists[0].url;
			}
			/**
			 * 移出图片
			 */
			const removeImg = async (index, lists) => {
				createShopForm.shopAvatar = "";
			}
			/**
			 * 从本地获取用户信息
			 */
			const getUserInfoFromLocal = async () => {
				try {
					const res = await wx.getStorage({
						key: 'userInfo',
						encrypt: true,
					})
					return res.data;
				} catch (e) {
					console.warn(e);
					return user.userInfo;
				}
			}

			/**
			 * 提交创建商铺请求
			 */
			const submitCreateShop = async () => {
				await createShopFormRef.value.validate(async (valid) => {
					if (valid) {
						if (createShopForm.shopAvatar == "") {
							uni.showToast({
								icon: 'error',
								title: '请上传店铺头像'
							});
							return;
						}

						const templeteList = ['FjniTcotQ5M9gyPI8YQdWlVpmrexOUFZu3O7jHCnE3s'];
						uni.requestSubscribeMessage({
							tmplIds: templeteList,
							async success(res) {
								console.log(res);
								// 申请订阅成功
								if (res.errMsg === 'requestSubscribeMessage:ok') {
									// 	wx.cloud
									// 		.callFunction({
									// 			name: 'subscribe',
									// 			data: {
									// 				data: item,
									// 				templateId: templeteList[0],
									// 			},
									// 		})
									// 		.then(() => {
									// 			uni.showToast({
									// 				title: '订阅成功',
									// 				icon: 'success',
									// 				duration: 2000,
									// 			});
									// 		})
									// 		.catch(() => {
									// 			uni.showToast({
									// 				title: '订阅失败',
									// 				icon: 'success',
									// 				duration: 2000,
									// 			});
									// 		});

								} else {

								}

								uni.showLoading({
									title: '创建中',
								});
								try {
									const file = await wx.cloud.uploadFile({
										cloudPath: 'shop/' + new Date().getTime() +
											getUUID() + 'img.jpg',
										filePath: createShopForm.shopAvatar,
									});

									createShopForm.shopAvatar = file.fileID;

									const res = await request("shop", {
										type: "createShop",
										createShopForm
									})
									uni.hideLoading();

									uni.showToast({
										icon: res.success ? 'success' : 'error',
										title: res.message
									})

									setTimeout(() => {
										uni.navigateBack();
									}, 1500);
								} catch (e) {
									console.trace(e);
									uni.showToast({
										icon: 'error',
										title: "创建失败"
									})
								}
							}
						})
					} else {
						console.log("验证失败")
					}
				})
			}

			return {
				createShopFormRef,
				submitCreateShop,
				getUserInfoFromLocal,
				rules,
				createShopForm,
				chooseComplete,
				removeImg
			}
		},
		async onReady() {
			const res = await this.getUserInfoFromLocal();
			this.createShopForm.username = res.nickName;
			this.createShopFormRef.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: $background-color;
		position: relative;

		.content {
			background-color: $background-color;
			padding: 30rpx;
			position: relative;
		}

		.submit {
			position: absolute;
			bottom: 50rpx;
			width: 100%;
			padding: 30rpx;
		}
	}
</style>
