// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const log = cloud.logger();

	const _ = db.command;

	const {
		goodItem
	} = event;

	let res = {};
	console.log(goodItem)

	try {
		const goodOrderDb = db.collection('good-orders');

		const temp = await goodOrderDb.where({
			orderId: _.eq(goodItem.orderId),
			goodId: _.eq(goodItem.goodId)
		}).update({
			data:{
				status: 4
			}
		})
		console.log(temp)
		res = {
			success: true,
			message: "完成评论",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "订单取消失败",
			data: e
		}
	}

	return res;
}
