// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		shopId
	} = event;
	const goodDb = db.collection('goods');
	const _ = db.command;

	const {
		data
	} = await goodDb.where({
			shopId: _.eq(shopId),
			status: true
		}).orderBy('createTime', 'desc')
		.get();

	let res = {};
	res = {
		sucess: true,
		message: "",
		data: data
	}

	return res;
}
