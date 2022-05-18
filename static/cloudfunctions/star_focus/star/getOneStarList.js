// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {
		const starDb = db.collection('star');
		const {
			data
		} = await starDb.where({
			_openid: openid
		}).get();
		res = {
			sucess: true,
			message: "",
			data: data.map(item => item.shareId),
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
