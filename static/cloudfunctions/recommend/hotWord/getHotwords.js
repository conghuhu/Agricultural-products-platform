// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const _ = db.command;

	let res = {};

	try {
		const hotWordDb = db.collection('hot-words');

		const temp = await hotWordDb.orderBy('count', 'desc').limit(10).get();

		res = {
			sucess: true,
			message: "",
			data: temp.data
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
