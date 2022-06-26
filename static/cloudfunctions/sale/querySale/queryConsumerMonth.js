// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");

// 查询用户近一个月消费
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const saleDb = db.collection('sales');
	const _ = db.command;
	const $ = db.command.aggregate;

	const openid = wxContext.OPENID;

	try {
		const nowTime = new Date().toISOString();

		const month_timestamp = 1000 * 60 * 60 * 24 * 30;

		const {
			list
		} = await saleDb.aggregate()
			.match({
				_openid: _.eq(openid)
			})
			.addFields({
				now: $.dateFromString({
					dateString: nowTime
				})
			})
			.project({
				diff: $.subtract(['$now', '$createTime']),
				goodTotalPrice: true
			})
			.match({
				diff: _.lte(month_timestamp)
			})
			.group({
				_id: null,
				totalSale: $.sum('$goodTotalPrice')
			})
			.end();

		res = {
			sucess: true,
			message: "",
			data: list.length != 0 ? list[0] : {
				totalSale: 0
			}
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
