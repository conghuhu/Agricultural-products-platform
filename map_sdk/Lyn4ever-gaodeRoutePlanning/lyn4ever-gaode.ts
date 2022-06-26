//高德key
const key = 'e4e0d14ae386fc34f379631bbceeea90';

import amapFile from '@/map_sdk/Lyn4ever-gaodeRoutePlanning/amap-uni';

/*
调用高德地图api进行路线规划时,
高德对途经点的坐标格式如下:

116.441063,39.91903;
116.39622,39.912057;
116.39622,39.912057;
116.39622,39.912057;
116.39622,39.912057;
116.39622,39.912057;
116.39622,39.912057;
116.39622,39.912057

也就是说每个点的经纬度之间用;分隔,所以请提前格式化好您的坐标格式

*/


export function PlanningRoute(start, end, _waypoints, supplement, result, fail) {
	let that = this;
	const myAmapFun = new amapFile({
		key: key
	});

	const type = supplement.type;

	if (type === 'driver') {
		myAmapFun.getDrivingRoute({
			origin: start,
			destination: end,
			waypoints: _waypoints,
			success: function(data) {
				var points = [];
				if (data.paths && data.paths[0] && data.paths[0].steps) {
					var steps = data.paths[0].steps;
					for (var i = 0; i < steps.length; i++) {
						var poLen = steps[i].polyline.split(';');
						for (var j = 0; j < poLen.length; j++) {
							points.push({
								longitude: parseFloat(poLen[j].split(',')[0]),
								latitude: parseFloat(poLen[j].split(',')[1])
							})
						}
					}
				}
				//这个返回结果就是对应的路线坐标,其他属性页面自己配置,请参照uniapp地图组件一章节
				//https://uniapp.dcloud.io/component/map
				const path = data.paths[0];
				result({
					points: points,
					color: "#05c134",
					width: 8,
					arrowLine: true,
					info: {
						distance: path.distance,
						duration: path.duration,
						traffic_lights: path.traffic_lights,
						toll_distance: path.toll_distance,
						tolls: path.tolls
					}
				})
			},
			fail: function(info) {
				fail(info)
			}
		})
	} else if (type === 'transit') {
		myAmapFun.getTransitRoute({
			origin: start,
			destination: end,
			waypoints: _waypoints,
			city: supplement.city,
			success: function(data) {
				console.log(data);
				// var points = [];
				// if (data.paths && data.paths[0] && data.paths[0].steps) {
				// 	var steps = data.paths[0].steps;
				// 	for (var i = 0; i < steps.length; i++) {
				// 		var poLen = steps[i].polyline.split(';');
				// 		for (var j = 0; j < poLen.length; j++) {
				// 			points.push({
				// 				longitude: parseFloat(poLen[j].split(',')[0]),
				// 				latitude: parseFloat(poLen[j].split(',')[1])
				// 			})
				// 		}
				// 	}
				// }
				// //这个返回结果就是对应的路线坐标,其他属性页面自己配置,请参照uniapp地图组件一章节
				// //https://uniapp.dcloud.io/component/map
				// result({
				// 	points: points,
				// 	color: "#05c134",
				// 	width: 8,
				// 	arrowLine: true,
				// })
			},
			fail: function(info) {
				fail(info)
			}
		})
	} else if (type === 'walk') {
		myAmapFun.getWalkingRoute({
			origin: start,
			destination: end,
			waypoints: _waypoints,
			success: function(data) {
				var points = [];
				if (data.paths && data.paths[0] && data.paths[0].steps) {
					var steps = data.paths[0].steps;
					for (var i = 0; i < steps.length; i++) {
						var poLen = steps[i].polyline.split(';');
						for (var j = 0; j < poLen.length; j++) {
							points.push({
								longitude: parseFloat(poLen[j].split(',')[0]),
								latitude: parseFloat(poLen[j].split(',')[1])
							})
						}
					}
				}
				//这个返回结果就是对应的路线坐标,其他属性页面自己配置,请参照uniapp地图组件一章节
				//https://uniapp.dcloud.io/component/map
				const path = data.paths[0];
				result({
					points: points,
					color: "#05c134",
					width: 8,
					arrowLine: true,
					info: {
						distance: path.distance,
						duration: path.duration,
					}
				})
			},
			fail: function(info) {
				fail(info)
			}
		})
	} else if (type === 'ride') {
		myAmapFun.getRidingRoute({
			origin: start,
			destination: end,
			waypoints: _waypoints,
			success: function(data) {
				var points = [];
				if (data.paths && data.paths[0] && data.paths[0].steps) {
					var steps = data.paths[0].steps;
					for (var i = 0; i < steps.length; i++) {
						var poLen = steps[i].polyline.split(';');
						for (var j = 0; j < poLen.length; j++) {
							points.push({
								longitude: parseFloat(poLen[j].split(',')[0]),
								latitude: parseFloat(poLen[j].split(',')[1])
							})
						}
					}
				}
				//这个返回结果就是对应的路线坐标,其他属性页面自己配置,请参照uniapp地图组件一章节
				//https://uniapp.dcloud.io/component/map
				const path = data.paths[0];
				result({
					points: points,
					color: "#05c134",
					width: 8,
					arrowLine: true,
					info: {
						distance: path.distance,
						duration: path.duration,
					}
				})
			},
			fail: function(info) {
				fail(info)
			}
		})
	}
	else {
		throw new Error('未知的规划类型')
	}
}
//标记标记点
export function Makemarkers(startpoi, endpoi, waypoints, success) {
	let markers = [];

	//起点
	let start = {
		iconPath: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location_dark.png?sign=f34a45d72d702b9101c0d4c22218e648&t=1655992821',
		width: '60rpx',
		height: '60rpx',
		id: 0,
		longitude: startpoi.split(",")[0],
		latitude: startpoi.split(",")[1],
	}
	markers.push(start)
	//终点
	let end = {
		iconPath: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location_dark.png?sign=f34a45d72d702b9101c0d4c22218e648&t=1655992821',
		width: '60rpx',
		height: '60rpx',
		id: 1,
		longitude: endpoi.split(",")[0],
		latitude: endpoi.split(",")[1],
	}
	markers.push(end)
	//途经点,先将其分隔成为数组
	let _waypoints = waypoints.split(';')
	for (let i = 0, _len = _waypoints.length; i < _len; i++) {
		let point = {
			iconPath: 'https://636c-cloud1-7giqepei42865a68-1311829757.tcb.qcloud.la/material/location_dark.png?sign=f34a45d72d702b9101c0d4c22218e648&t=1655992821',
			width: '60rpx',
			height: '60rpx',
			id: i,
			longitude: parseFloat(_waypoints[i].split(",")[0]),
			latitude: parseFloat(_waypoints[i].split(",")[1]),
		}
		markers.push(point)
	}

	//统一风格为回调方式,也可以直接返回这个markers
	success(markers);

}
