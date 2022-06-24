// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		shareId
	} = event;

	const _ = db.command;

	let res = {};

	try {
		const shareDb = db.collection('share');

		const {
			data
		} = await shareDb.doc(shareId).get();

		const userDb = db.collection('users');

		const goodDb = db.collection('goods');

		const userRes = await userDb.where({
			_openid: data._openid
		}).get();

		data.author = userRes.data[0];
		delete data._openid;

		if (data.goodId) {
			const goodInfo = await goodDb.doc(data.goodId).get();
			data.goodInfo = goodInfo.data;
			delete data.goodId
		}

		res = {
			sucess: true,
			message: "",
			data: data
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
