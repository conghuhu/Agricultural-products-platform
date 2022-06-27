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

	const $ = db.command.aggregate

	let res = {};

	try {
		const orderDb = db.collection('order');

		const goodDb = db.collection('goods');

		const goodOrderDb = db.collection('good-orders');

		const shopDb = db.collection('shops');

		const isAbsent = await shopDb.where({
			_openid: _.eq(openid)
		}).get();

		if (isAbsent.data.length > 0) {
			const shopId = isAbsent.data[0]._id;
			const statusArr = await Promise.all([goodOrderDb.where({
				shopId: _.eq(shopId),
				status: 1
			}).get(), goodOrderDb.where({
				shopId: _.eq(shopId),
				status: 2
			}).get(), goodOrderDb.where({
				shopId: _.eq(shopId),
				status: 3
			}).get(), goodOrderDb.where({
				shopId: _.eq(shopId),
				status: 4
			}).get()]);

			log.info({
				name: 'queryOrderStatus',
				message: `查询到的openid为${openid}的订单状态`,
				data: statusArr
			});

			const dataList = [];

			return {
				success: true,
				message: "查询成功",
				data: statusArr.map((item, index) => {
					return {
						_id: index + 1,
						count: item.data.length
					}
				})
			}
		} else {
			return {
				success: true,
				message: "用户未开通店铺",
				data: []
			}
		}


	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "查询失败",
			data: e
		}
	}

	return res;
}
