// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const {
		target_openid
	} = event;

	let res = {};

	const _ = db.command;

	try {
		const userDb = db.collection('users');
		const temp = await userDb.where({
			_openid: openid || target_openid,
		}).get();

		res = {
			sucess: true,
			message: "",
			data: temp.data[0].money
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
