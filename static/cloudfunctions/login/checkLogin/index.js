// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

    const openId = wxContext.OPENID;

	const userDb = db.collection('users');
	const _ = db.command
	const isAbsent = await userDb.where({
		_openid: _.eq(openId)
	}).get();
	
	const data = isAbsent.data;
	
	return {
		data
	};
}
