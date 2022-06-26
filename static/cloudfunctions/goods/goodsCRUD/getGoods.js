// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 获取某个商铺商品信息，包括销量和评论
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		shopId,
		keyword
	} = event;

	let res = {};

	try {
		const goodDb = db.collection('goods');
		const saleDb = db.collection('sales');
		const _ = db.command;
		const $ = db.command.aggregate;

		let temp;

		if (keyword && keyword != "") {
			temp = await goodDb.where(_.and([{
						status: true
					},
					_.or([{
							goodName: db.RegExp({
								//从搜索栏中获取的value作为规则进行匹配。
								regexp: keyword,
								//大小写不区分
								options: 'i',
							})
						},
						{
							description: db.RegExp({
								//从搜索栏中获取的value作为规则进行匹配。
								regexp: keyword,
								//大小写不区分
								options: 'i',
							})
						}
					])
				]))
				.orderBy('createTime', 'desc')
				.get();
		} else {
			temp = await goodDb.where({
					shopId: _.eq(shopId),
					status: true
				}).orderBy('createTime', 'desc')
				.get();
		}

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

		res = {
			success: true,
			message: "",
			data: dataList,
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			success: false,
			message: "获取商品列表失败",
			data: null
		}
	}

	return res;
}
