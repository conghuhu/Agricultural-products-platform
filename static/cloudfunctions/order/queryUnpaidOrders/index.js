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

	let res = {};

	try {
		const orderDb = db.collection('order');

		const goodDb = db.collection('goods');

		const temp = await orderDb.where({
			_openid: _.eq(openid),
			status: 1
		}).get();

		log.info({
			name: 'queryUnpaidOrders',
			message: '查询到的order为1的结果',
			data: temp
		});

		const dataList = [];

		for (let i = 0; i < temp.data.length; i++) {
			const item = temp.data[i];
			const tasks = [];

			for (let i = 0; i < item.goodList.length; i++) {
				const goodId = item.goodList[i][0];
				const promise = goodDb.doc(goodId).get();
				tasks.push(promise);
			}

			const goodRes = await Promise.all(tasks);

			log.info({
				name: 'queryUnpaidOrders',
				message: `查询到_id为 ${item._id} order的goodList信息`,
				data: goodRes
			});

			const goodList = [];

			for (let i = 0; i < goodRes.length; i++) {
				const goodInfo = goodRes[i].data;
				goodInfo.count = item.goodList[i][1];
				goodList.push(goodInfo);
			}

			item.goodList = goodList;

			dataList.push(item);
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
