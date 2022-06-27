// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 查询待收货的货物-商家端
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const log = cloud.logger();

	const _ = db.command;

	const {
		shopId
	} = event;

	let res = {};

	try {
		const orderDb = db.collection('order');

		const goodDb = db.collection('goods');

		const goodOrderDb = db.collection('good-orders');

		const temp = await goodOrderDb.where({
			shopId: _.eq(shopId),
			status: 2
		}).orderBy('createTime', 'desc').get();


		log.info({
			name: 'queryIngGoodsMerchant',
			message: `${shopId}商铺查询到的good-orders中为2的结果`,
			data: temp
		});

		const dataList = [];
		// 并行任务
		const tasks = [];

		for (let i = 0; i < temp.data.length; i++) {
			const item = temp.data[i];
			const goodId = item.goodId;
			const promise = goodDb.doc(goodId).get();
			tasks.push(promise);
		}

		const goodRes = await Promise.all(tasks);

		for (let i = 0; i < goodRes.length; i++) {
			const goodInfo = goodRes[i].data;
			goodInfo.count = temp.data[i].count;
			goodInfo.orderId = temp.data[i].orderId;
			dataList.push(goodInfo);
		}

		res = {
			success: true,
			message: "查询成功",
			data: dataList
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
