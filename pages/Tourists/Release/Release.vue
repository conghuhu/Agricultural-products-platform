<template>
	<view class="fullScreen">
		<Nav title="发布" isBack></Nav>
		<view class="content">
			<u-form :model="form" ref="formRef" :label-width="0">
				<u-form-item label="" prop="title">
					<u-input placeholder="填写标题会有更多赞哦~" v-model="form.title" />
				</u-form-item>
				<u-form-item label="" prop="content">
					<u-input placeholder="添加正文" type="textarea" :height="200" :auto-height="true"
						v-model="form.content" />
				</u-form-item>
				<u-form-item label="" prop="location">
					<view class="location" @click="chooseLocation">
						<view class="location_group">
							<image style="width: 36rpx;height: 36rpx;"
								src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location.png?sign=c1ea39e3c461e32946bed9fa5417d24f&t=1652769718"
								mode="aspectFit"></image>
							<view class="locationVal">
								{{form.locationVal == "" ? '添加位置' :form.locationVal}}
							</view>
						</view>

						<image style="width: 36rpx;height: 36rpx;"
							src="https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/right.png?sign=f84be8ca8d3e8ff1dbf3efafb59f7e25&t=1652768975"
							mode="aspectFit"></image>
					</view>
				</u-form-item>
				<u-form-item label="" prop="imageList">
					<u-upload @on-choose-complete="chooseComplete" @on-remove="removeImg" :auto-upload="false"
						:max-size="5 * 1024 * 1024" max-count="6"></u-upload>
				</u-form-item>
			</u-form>

			<view class="action">
				<u-button type="primary" @click="submit">发布</u-button>
			</view>
		</view>
	</view>

</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import getUUID from '@/utils/getUUID';
	import request from '@/api/request';

	export default {
		setup() {
			const form = reactive({
				title: '',
				content: '',
				locationVal: '',
				location: [],
				adcode: '',
				imageList: []
			});

			let formRef = ref(null);

			const submitLoading = ref(false);

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
			}
			/**
			 * 移出图片
			 */
			const removeImg = async (index, lists) => {
				form.imageList.splice(index, 1);
			}

			/**
			 * 选择位置
			 */
			const chooseLocation = async () => {
				const {
					latitude,
					longitude
				} = await wx.getLocation({
					type: 'gcj02'
				});
				const res = await wx.chooseLocation({
					latitude: latitude,
					longitude: longitude,
				})
				form.location.length = 0;
				form.location.push(res.longitude);
				form.location.push(res.latitude);
				form.locationVal = res.name;
				const ans = await wx.serviceMarket.invokeService({
					service: 'wxc1c68623b7bdea7b',
					api: 'rgeoc',
					data: {
						"location": res.latitude + "," + res.longitude
					},
				});
				form.adcode = ans.data.result.ad_info.adcode;
			}

			/**
			 * 发布种草
			 */
			const submit = async () => {
				console.log(form);
				submitLoading.value = true;
				const fileList = await Promise.all(form.imageList.map(item => {
					return wx.cloud.uploadFile({
						cloudPath: 'shareImg/' + new Date().getTime() +
							getUUID()+'img.jpg',
						filePath: item,
					})
				}));
				form.imageList.length = 0;
				fileList.forEach(item => {
					form.imageList.push(item.fileID);
				});
				const res = await request('share', {
					type: 'addShare',
					form,
				});
				submitLoading.value = false;
				await wx.showToast({
					title: '发布成功',
					duration: 1000
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}

			return {
				form,
				formRef,
				chooseComplete,
				removeImg,
				chooseLocation,
				submit,
				submitLoading
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: #F2F4F7;

		.content {
			padding: 30rpx;

			.location {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.location_group {
					display: flex;
					justify-content: center;
					align-items: center;

					.locationVal {
						font-size: 28rpx;
						color: #b6bac0;
						line-height: normal;
						margin-left: 10rpx;
					}
				}


			}
		}
	}
</style>
