// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 获取某人点赞种草信息列表
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {
		const starDb = db.collection('star');
		const shareDb = db.collection('share');
		const {
			data
		} = await starDb.where({
			_openid: openid,
			type: 1
		}).get();

		const actionList = data.map(item => {
			return shareDb.doc(item.shareId).get();
		});

		const temp = await Promise.all(actionList);

		res = {
			sucess: true,
			message: "",
			data: temp.map(item => item.data),
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
