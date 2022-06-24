// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 查询退款中的货物
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const log = cloud.logger();

	const _ = db.command;

	let res = {};

	try {
		const orderDb = db.collection('order');

		const goodDb = db.collection('goods');

		const goodOrderDb = db.collection('good-orders');

		const temp = await goodOrderDb.where({
			_openid: _.eq(openid),
			status: 4
		}).orderBy('createTime', 'desc').get();


		log.info({
			name: 'queryIngGoods',
			message: '查询到的 good-orders 中为4的结果',
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
