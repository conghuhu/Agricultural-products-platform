<template>
	<view>
		<view>
			<u-navbar title="新增收货地址" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
				</view>
			</u-navbar>
		</view>
		<view>
			<u-form :model="form">
				<u-form-item label="地址" labelWidth="80px">
					<u-input v-model="form.adress" placeholder="请选择收货地址" disabled="true"  @click="inputAdress()"/>
				</u-form-item>
				<u-form-item label="门牌号" labelWidth="80px">
					<u-input v-model="form.house" placeholder="例:16栋3层501室" />
				</u-form-item>
				<u-form-item label="收货人" labelWidth="80px">
					<u-input v-model="form.consignee" placeholder="请输入收货人姓名"  />
				</u-form-item>
				<u-form-item label="        " labelWidth="80px">
					<u-radio-group v-model="form.sex" @change="sexGroupChange">
						<u-radio v-for="(item, index) in list" :key="index" :name="item.sex" :disabled="item.disabled">
							{{item.sex}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="手机号" labelWidth="80px">
					<u-input v-model="form.phone"  placeholder="请输入收货人手机号"  />
				</u-form-item>
				
			
			</u-form>
			<u-button @click="submit" type="success" shape="circle" >提交</u-button>
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
				_id:"",
				adress: "",
				house: "",
				consignee: "",
				sex: "",
				phone: "",
			})
			
			const list = ref([{
					sex: "先生",
					disabled: false

				},
				{
					sex: "女士",
					disabled: false

				},
			])

			const currentSex = ref("");

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
				wx.navigateBack()({

				})
			}

			const sexGroupChange = (e) => {
				
			}

			//微信获取位置
			const res = reactive({
				type: "",
				city: "",
				name: "",
				adress: "",
				latitude: "",
				longitude: "",
				location:""
			})
			async function inputAdress() {
				const {
					latitude,
					longitude
				} = await wx.getLocation();
				res.adress = form.adress;
				res.latitude = latitude;
				res.longitude = longitude;
				const result = await wx.chooseLocation(res)
				form.adress = result.name
				form.location=result.address
			}
			//提交地址信息
			async function submit(){
				console.log(form)
				const result = await request("touristInfo",{
					form:form,
					type:"submitAdress"
				})
				console.log(result.res)
				uni.navigateBack({
					
				})
			}
			return {
				form,
				list,
				currentSex,
				sexGroupChange,
				background,
				rightClick,
				inputAdress,
				res,
				submit
			}
		},
		onLoad(val) {
			console.log(val.addressInfo)
			if(val.addressInfo!=null){
				Object.assign(this.form,JSON.parse(val.addressInfo))
			}
			console.log(this.form)
		}
		



	}
</script>

<style>

</style>
