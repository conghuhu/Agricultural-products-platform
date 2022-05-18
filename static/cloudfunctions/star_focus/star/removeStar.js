// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		shareId
	} = event;

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {
		const starDb = db.collection('star');
		const shareDb = db.collection('share');
		const temp = await Promise.all([starDb.where({
			_openid: openid,
			shareId: shareId,
		}).remove(), shareDb.doc(shareId).update({
			data: {
				star: _.inc(-1)
			}
		})]);
		res = {
			sucess: true,
			message: "",
			data: temp,
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
