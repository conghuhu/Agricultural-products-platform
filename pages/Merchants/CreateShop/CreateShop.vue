<template>
	<view class="fullScreen">
		<Nav :title="title" isBack />
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
					<block v-if="mode === 'edit'">
						<u-upload :fileList="createShopForm.shopAvatar !== '' ? [{
							url: createShopForm.shopAvatar
						}]:[]" @on-choose-complete="chooseComplete" @on-remove="removeImg" :auto-upload="false"
							:max-size="5 * 1024 * 1024" max-count="1"></u-upload>
					</block>
					<block v-else>
						<u-upload @on-choose-complete="chooseComplete" @on-remove="removeImg" :auto-upload="false"
							:max-size="5 * 1024 * 1024" max-count="1"></u-upload>
					</block>
				</u-form-item>
			</u-form>
		</view>
		<view class="submit">
			<u-button v-if="mode === 'edit'" type="primary" @click="submitEditShop">提交</u-button>
			<u-button v-else type="primary" @click="submitCreateShop">创建</u-button>
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
	import {
		merchantStore
	} from '@/stores/merchant';
	import getUUID from '@/utils/getUUID';
	import isCloudImg from '@/utils/isCloudImg';
	export default {
		setup() {
			const title = ref('创建店铺');
			const mode = ref('create');
			const loading = ref(true);

			const merchant = merchantStore();
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
				console.log(lists)
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
						// 订阅消息
						const templeteList = ['FjniTcotQ5M9gyPI8YQdWlVpmrexOUFZu3O7jHCnE3s'];
						uni.requestSubscribeMessage({
							tmplIds: templeteList,
							async success(res) {
								console.log(res);
								// 申请订阅成功
								if (res.errMsg === 'requestSubscribeMessage:ok') {

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

			const initEditMode = async () => {
				mode.value = "edit";
				title.value = "编辑商铺信息";
				const shopId = merchant.shopInfo._id;
				const res = await request('shop', {
					type: 'getShopInfo',
					shopId: shopId
				});
				const shopInfo = res.data;
				Object.assign(createShopForm, shopInfo);
			}

			const submitEditShop = async () => {
				await createShopFormRef.value.validate(async (valid) => {
					if (valid) {
						if (createShopForm.shopAvatar == "") {
							uni.showToast({
								icon: 'error',
								title: '请上传店铺头像'
							});
							return;
						}
						uni.showLoading({
							title: '提交中',
						});
						try {
							if (!isCloudImg(createShopForm.shopAvatar)) {
								const file = await wx.cloud.uploadFile({
									cloudPath: 'shop/' + new Date().getTime() +
										getUUID() + 'img.jpg',
									filePath: createShopForm.shopAvatar,
								});
								createShopForm.shopAvatar = file.fileID;
							}

							const res = await request("shop", {
								type: "editShop",
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
								title: "修改失败"
							})
						}
					} else {
						console.log("验证失败")
					}
				})
			}

			return {
				title,
				createShopFormRef,
				submitCreateShop,
				getUserInfoFromLocal,
				rules,
				createShopForm,
				chooseComplete,
				removeImg,
				initEditMode,
				mode,
				submitEditShop
			}
		},
		async onLoad(option) {
			const res = await this.getUserInfoFromLocal();
			this.createShopForm.username = res.nickName;
			this.createShopFormRef.setRules(this.rules);

			const mode = option.mode;
			if (mode === 'edit') {
				this.initEditMode();
			}
		}
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
