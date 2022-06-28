// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const shopDb = db.collection('shops');
	const _ = db.command;

	const openId = wxContext.OPENID;

	const record = await shopDb.where({
		_openid: _.eq(openId)
	}).get();

	return {
		sucess: true,
		message: record.data.length != 0 ? '' : "未创建店铺",
		data: record.data
	};
}
