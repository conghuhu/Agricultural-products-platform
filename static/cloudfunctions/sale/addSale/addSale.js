// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");

// 产生销量数据
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const goodDb = db.collection('sales');
	const _ = db.command;
	const $ = db.command.aggregate;

	const {
		goodId,
		openId,
		createTime,
		goodNums,
		goodTotalPrice
	} = event;

	try {
		const temp = await goodDb.add({
			data: {
				goodId: goodId,
				_openid: openId,
				newTime: dayjs(new Date()).format('YYYY-MM-DD'),
				createTime: db.serverDate(),
				goodNums: goodNums,
				goodTotalPrice: goodTotalPrice
			}
		})

		res = {
			success: true,
			message: "",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
