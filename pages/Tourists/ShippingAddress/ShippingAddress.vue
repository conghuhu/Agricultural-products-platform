<template>
	<view class="fullScreen">
		<view>
			<u-navbar title="新增收货地址" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick">
				</view>
			</u-navbar>
		</view>
		<view class="content">
			<u-form :model="form">
				<u-form-item label="地址" labelWidth="80px">
					<u-input v-model="form.adress" placeholder="请选择收货地址" :disabled="true" @click="inputAdress()" />
				</u-form-item>
				<u-form-item label="门牌号" labelWidth="80px">
					<u-input v-model="form.house" placeholder="例:16栋3层501室" />
				</u-form-item>
				<u-form-item label="收货人" labelWidth="80px">
					<u-input v-model="form.consignee" placeholder="请输入收货人姓名" />
				</u-form-item>
				<u-form-item label=" " labelWidth="80px">
					<u-radio-group activeColor="#4cd964" v-model="form.sex">
						<u-radio name="先生">
							先生
						</u-radio>
						<u-radio name="女士">
							女士
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="手机号" labelWidth="80px">
					<u-input v-model="form.phone" placeholder="请输入收货人手机号" />
				</u-form-item>
			</u-form>
			<u-button @click="submit" type="success" shape="circle">提交</u-button>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import request from '@/api/request';
	export default {
		setup() {
			const form = reactive({
				_id: "",
				adress: "",
				house: "",
				consignee: "",
				sex: "",
				phone: "",
				locationArr: []
			});

			const background = ref({
				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			});
			async function rightClick() {
				wx.navigateBack();
			}

			//微信获取位置
			const res = reactive({
				type: "",
				city: "",
				name: "",
				adress: "",
				latitude: "",
				longitude: "",
				location: ""
			})
			async function inputAdress() {
				const {
					latitude,
					longitude
				} = await wx.getLocation();
				res.adress = form.adress;
				res.latitude = latitude;
				res.longitude = longitude;
				const result = await wx.chooseLocation(res);
				console.log(result);
				form.adress = result.name
				form.location = result.address
				form.locationArr.length = 0;
				form.locationArr.push(result.longitude);
				form.locationArr.push(result.latitude);
			}
			//提交地址信息
			async function submit() {
				console.log(form)
				const result = await request("touristInfo", {
					form: form,
					type: "submitAdress"
				})
				console.log(result.res);
				uni.navigateBack();
			}
			return {
				form,
				background,
				rightClick,
				inputAdress,
				res,
				submit
			}
		},
		onLoad(val) {
			if (val.addressInfo) {
				const obj = JSON.parse(val.addressInfo);
				Object.assign(this.form, obj);
				this.form.locationArr = [obj.locationArr.coordinates[0], obj.locationArr.coordinates[1]];
			}
		}

	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: #F2F4F7;
		position: relative;

		.content {
			padding: 30rpx;
		}
	}
</style>
