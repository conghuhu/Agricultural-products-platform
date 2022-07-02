// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 获取热卖榜
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	
	const {
		limit
	} = event;

	let res = {};

	try {
		const goodDb = db.collection('goods');
		const saleDb = db.collection('sales');
		const _ = db.command;
		const $ = db.command.aggregate;


		const temp = await goodDb.where({
				status: true
			})
			.get();

		const tasks = [];

		const dataList = temp.data;

		dataList.forEach(item => {
			const promise = saleDb.aggregate()
				.match({
					goodId: _.eq(item._id)
				})
				.group({
					_id: '$goodId',
					totalSale: $.sum('$goodNums')
				})
				.end();
			tasks.push(promise);
		});

		const saleRes = await Promise.all(tasks);

		for (let i = 0; i < dataList.length; i++) {
			const list = saleRes[i].list;
			const item = dataList[i];
			item.totalSale = list.length > 0 ? list[0].totalSale : 0;
		}

		const sortdataList = dataList.sort((a, b) => b.totalSale - a.totalSale);

		res = {
			success: true,
			message: "",
			data: sortdataList.slice(0, limit)
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			success: false,
			message: "获取商品列表失败",
			data: e
		}
	}

	return res;
}
