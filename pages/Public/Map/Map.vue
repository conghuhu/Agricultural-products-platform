<template>
	<view class="fullScreen">
		<Nav title="位置" isBack />

		<view>
			<u-tabs activeColor="#4CC818" :showBar="false" :list="tabList" :is-scroll="false" v-model="currentTab"
				@change="changeTab" />
		</view>

		<MyLoading v-if="loading" />

		<block v-else>
			<map style="width: 750rpx;height: 100%;" :show-compass="true" :show-location="true" :longitude="longitude"
				:latitude="latitude" :markers="covers" :polyline="polyline"></map>

			<view class="card">
				<text style="font-weight: 550;font-size: 36rpx;">{{secondToMiniute(expectInfo.duration)}}分钟</text>
				<view class="bottom">
					<text style="margin-right: 10rpx;">{{mToKillM(expectInfo.distance)}}公里</text>
					<block v-if="currentTab == 0">
						<view>
							<u-image height="36rpx" width="36rpx" mode="aspectFit" src="/static/images/light.png">
							</u-image>
						</view>
						<text>{{expectInfo.traffic_lights}}</text>
					</block>

				</view>

			</view>
		</block>

	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		watch
	} from 'vue';
	import {
		PlanningRoute,
		Makemarkers
	} from '@/map_sdk/Lyn4ever-gaodeRoutePlanning/lyn4ever-gaode'
	export default {
		setup() {

			// 起点
			const start = ref('');
			// 终点
			const end = ref('');

			const longitude = ref(116.39742);
			const latitude = ref(39.909);

			// 当前位置详细信息，包括城市代码等
			const currentLocationDetailInfo = reactive({});

			const covers = reactive([]);

			const polyline = reactive([]);

			const currentTab = ref(0);

			const tabList = reactive([{
				name: '驾车'
			}, {
				name: '公共交通'
			}, {
				name: '步行'
			}, {
				name: '骑行'
			}]);

			const loading = ref(true);

			const expectInfo = reactive({
				// 米
				distance: NaN,
				// 秒
				duration: NaN,
				// 红绿灯个数
				traffic_lights: NaN,
				// 收费路段距离
				toll_distance: NaN,
				// 元，此导航方案道路收费
				tolls: NaN
			});

			const changeTab = (index) => {
				clear();
				if (index == 0) {
					initDriver();
				} else if (index == 1) {
					uni.showToast({
						title:'此功能开发中'
					})
					// initTransit();
				} else if (index == 2) {
					initWalking();
				} else if (index == 3) {
					initRiding();
				}
			}

			const initDriver = () => {
				loading.value = true;

				const wayPoi = "";

				const supplement = {
					type: "driver",
				}

				// 路线规划
				PlanningRoute(start.value, end.value, wayPoi, supplement, function(res) {
					Object.assign(expectInfo, res.info);
					delete res.info;
					polyline.push(res)
				});

				// 绘制
				Makemarkers(start.value, end.value, wayPoi, function(res) {
					covers.push.apply(covers, res)
				})

				loading.value = false;
			}

			const initTransit = () => {
				loading.value = true;

				const wayPoi = "";

				const supplement = {
					type: "transit",
					city: currentLocationDetailInfo.ad_info.city_code
				}

				// 路线规划
				PlanningRoute(start.value, end.value, wayPoi, supplement, function(res) {
					polyline.push(res)
				});

				// 绘制
				Makemarkers(start.value, end.value, wayPoi, function(res) {
					covers.push.apply(covers, res)
				})

				loading.value = false;
			}

			const initWalking = () => {
				loading.value = true;

				const wayPoi = "";

				const supplement = {
					type: "walk"
				}

				// 路线规划
				PlanningRoute(start.value, end.value, wayPoi, supplement, function(res) {
					Object.assign(expectInfo, res.info);
					delete res.info;
					polyline.push(res)
				});

				// 绘制
				Makemarkers(start.value, end.value, wayPoi, function(res) {
					covers.push.apply(covers, res)
				})

				loading.value = false;
			}

			const initRiding = () => {
				loading.value = true;

				const wayPoi = "";

				const supplement = {
					type: "ride"
				}

				// 路线规划
				PlanningRoute(start.value, end.value, wayPoi, supplement, function(res) {
					Object.assign(expectInfo, res.info);
					delete res.info;
					polyline.push(res)
				});

				// 绘制
				Makemarkers(start.value, end.value, wayPoi, function(res) {
					covers.push.apply(covers, res)
				})

				loading.value = false;
			}

			const clear = () => {
				covers.length = 0;
				polyline.length = 0;
				expectInfo.distance = NaN;
				expectInfo.duration = NaN;
				expectInfo.toll_distance = NaN;
				expectInfo.tolls = NaN;
				expectInfo.traffic_lights = NaN;
			}

			const secondToMiniute = (second) => {
				return accDiv(second, 60);
			};

			const mToKillM = (m) => {
				return accDiv(m, 1000)
			}

			const accDiv = (arg1, arg2) => {
				var t1 = 0,
					t2 = 0,
					r1, r2;

				try {
					t1 = arg1.toString().split(".")[1].length
				} catch (e) {}
				try {
					t2 = arg2.toString().split(".")[1].length
				} catch (e) {}

				r1 = Number(arg1.toString().replace(".", ""))
				r2 = Number(arg2.toString().replace(".", ""))
				return ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2);
			}

			return {
				longitude,
				latitude,
				covers,
				polyline,
				tabList,
				currentTab,
				changeTab,
				loading,
				start,
				initDriver,
				end,
				currentLocationDetailInfo,
				expectInfo,
				secondToMiniute,
				mToKillM
			}
		},
		async onLoad(option) {
			this.longitude = option.longitude;
			this.latitude = option.latitude;
			/**
			 * 获取起点
			 */
			const currentLocationRes = await uni.getLocation({
				type: 'gcj02'
			});


			const res = await wx.serviceMarket.invokeService({
				service: 'wxc1c68623b7bdea7b',
				api: 'rgeoc',
				data: {
					"location": currentLocationRes.latitude + "," + currentLocationRes.longitude
				},
			});
			console.log(res);

			Object.assign(this.currentLocationDetailInfo, res.data.result);

			this.start = currentLocationRes.longitude + "," + currentLocationRes.latitude;

			this.end = option.longitude + "," + option.latitude;

			this.initDriver();
		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.card {
			background-color: white;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			z-index: 9999;
			position: absolute;
			right: 30rpx;
			bottom: 120rpx;
			padding: 20rpx;

			.bottom {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
