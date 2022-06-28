// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");

// 产生销量数据
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const viewDb = db.collection('page_view');
	const _ = db.command;
	const $ = db.command.aggregate;

	const {
		goodId,
	} = event;

	try {
		const temp = await viewDb.add({
			data: {
				goodId: goodId,
				newTime: dayjs(new Date()).format('YYYY-MM-DD'),
				createTime: db.serverDate()
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
