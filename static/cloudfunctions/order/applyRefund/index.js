// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 申请商品退款
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

		const temp = await goodOrderDb.where({
			orderId: orderId,
			goodId: goodId
		}).update({
			data: {
				status: 4
			}
		});

		res = {
			success: true,
			message: "申请退款成功",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "申请退款失败",
			data: e
		}
	}

	return res;
}
