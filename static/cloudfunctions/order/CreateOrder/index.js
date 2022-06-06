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
		curLocationId,
		remarkVal,
		goodList
	} = event;

	let res = {};

	try {
		const orderDb = db.collection('order');
		await orderDb.add({
			data: {
				createTime: new Date(),
				curLocationId,
				remarkVal,
				goodList,
				// 订单状态 1：待支付 2.
				status: 1
			}
		});
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}

	return res;
}
