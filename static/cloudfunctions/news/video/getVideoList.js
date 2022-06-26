// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		limit
	} = event;

	try {

		const videoDb = db.collection('teach-video');
		const _ = db.command;
		const $ = db.command.aggregate;

		const limit_num = Number(limit);


		const result = (limit_num != NaN && limit_num > 0) ? await videoDb.orderBy('createTime', 'desc').limit(
				limit_num).get() :
			await videoDb.orderBy('createTime', 'desc').get();

		res = {
			sucess: true,
			message: "",
			data: result.data
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
