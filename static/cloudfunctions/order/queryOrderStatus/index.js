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

		const temp = await orderDb.aggregate()
			.match({
				_openid: _.eq(openid)
			})
			.group({
				_id: '$status',
				count: $.sum(1),
			})
			.end();


		log.info({
			name: 'queryOrderStatus',
			message: `查询到的openid为${openid}的订单状态`,
			data: temp.list
		});

		const dataList = [];

		res = {
			success: true,
			message: "查询成功",
			data: temp.list
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
