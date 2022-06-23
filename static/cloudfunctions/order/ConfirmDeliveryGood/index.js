// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	const {
		orderId,
		goodId
	} = event;

	let res = {};

	try {

		const goodOrderDb = db.collection('good-orders');
		const orderDb = db.collection('order');

		const temp = await goodOrderDb.where({
			goodId: goodId,
			orderId: orderId
		}).update({
			data: {
				status: 3
			}
		});

		res = {
			success: true,
			message: "收货成功",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "收货失败",
			data: e
		}
	}

	return res;
}
