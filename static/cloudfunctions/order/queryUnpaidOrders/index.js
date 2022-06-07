// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	let res = {};

	try {
		const goodOrderDb = db.collection('good-orders');

		const temp = await goodOrderDb.where({
			_openid: _.eq(openid),
			status: 1
		}).get();



		res = {
			sucess: true,
			message: "查询成功",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "查询失败",
			data: e
		}
	}

	return res;
}
