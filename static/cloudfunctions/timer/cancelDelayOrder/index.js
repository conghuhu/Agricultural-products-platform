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
		orderId,
		goodOrderIdList
	} = event;

	let res = {};

	try {
		log.info({
			name: 'cancelDelayOrder',
			message: `开启${orderId}订单的定时取消任务`,
			data: goodOrderIdList
		});

		const orderDb = db.collection('order');
		const goodOrderDb = db.collection('good-orders');
		setTimeout(async () => {
			const isAbsent = await orderDb.doc(orderId).get();
			// 如果未付款
			if (isAbsent.data.status == 1) {
				// 1.移除用户订单
				orderDb.doc(orderId).remove();
				// 2.移除各个商品的订单信息
				for (let i = 0; i < goodOrderIdList.length; i++) {
					const item = goodOrderIdList[i];
					goodOrderDb.doc(item).remove();
				}

				log.info({
					name: 'cancelDelayOrder',
					message: `成功移除${orderId}未支付订单`,
					data: goodOrderIdList
				});
			}

		}, 60000 * 15);
		res = {
			sucess: true,
			message: "订单超时取消设置成功",
			data: null
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "订单取消失败",
			data: e
		}
	}

	return res;
}
