// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 根据keyword获取商品
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		latitude,
		longitude
	} = event;
	const goodDb = db.collection('goods');
	const _ = db.command;

	const {
		data
	} = await goodDb.where({
		location: _.geoNear({
			geometry: db.Geo.Point(longitude, latitude)
		})
	}).get();

	let res = {};
	res = {
		sucess: true,
		message: "",
		data: data
	}

	return res;
}
