<template>
	<view>
		<view>
			<u-navbar title="新增收货地址" :is-back="true" :background="background">
				<view class="slot-wrap" @click="rightClick()">
				</view>
			</u-navbar>
		</view>
		<view>
			<u-form :model="form" ref="uForm">
				<u-field v-model="form.adress" label="地址" placeholder="请输入地址" @focus="inputAdress()">
				</u-field>
				<u-field v-model="form.house" label="门牌号" placeholder="例:16栋3层501">
				</u-field>
				<u-field v-model="form.consignee" label="收货人" placeholder="请输入收货人姓名">
				</u-field>
				<view style="width: 200px; margin-left: 100px;">
					<u-radio-group v-model="currentSex" @change="sexGroupChange">
						<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
				<u-field v-model="form.phone" label="手机号" placeholder="请输入收货人手机号">
				</u-field>


				

				<view style="margin-left: 20px;">
					<u-form-item label="标签">
						<view style="display: flex;justify-content: space-around;align-items: center;">
							<u-tag text="家" shape="circle" mode="plain" type="success" />
							<u-tag text="学校" shape="circle" mode="plain" type="success" />
							<u-tag text="公司" shape="circle" mode="plain" type="success" />
						</view>
					</u-form-item>
				</view>



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
	export default {
		setup() {
			const form = reactive({
				adress: String,
				house: String,
				consignee: String,
				sex: String,
				phone: Number,

			})
			const rules = ref({
				name: [{
					required: true,
					message: '请输入姓名',
					// 可以单个或者同时写两个触发验证方式
					trigger: 'blur,change'
				}],
				intro: [{
					min: 5,
					message: '简介不能少于5个字',
					trigger: 'change'
				}]
			})
			const list = ref([{
					name: "先生",
					disabled: false

				},
				{
					name: "女士",
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
			
			const sexGroupChange = (e)=>{
				console.log(e)
			}
			
			//微信获取位置
			const res = reactive({
				type:String,
				city:String,
				name:String,
				adress:String,
				latitude:Number,
				longitude:Number
			})
			async function inputAdress(){
				await wx.startLocationUpdateBackground();
				const {latitude,longitude} = await wx.getLocation();
				res.adress=form.adress;
				res.latitude=latitude;
				res.longitude=longitude;
				const result = await wx.choosePoi(res)
				console.log(result)
				
				
			}
			return {
				form,
				rules,
				list,
				currentSex,
				sexGroupChange,
				background,
				rightClick,
				inputAdress,
				res
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},



	}
</script>

<style>

</style>
