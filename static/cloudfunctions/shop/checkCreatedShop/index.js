// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	
	const wxContext = cloud.getWXContext();

	const userDb = db.collection('shops');
	const _ = db.command;

	const openId = wxContext.OPENID;

	const record = await userDb.where({
		_openid: _.eq(openId)
	}).get();

	let res = {};

	if (record.data.length != 0) {
		res = {
			sucess: true,
			message: "",
			data: record.data
		};
	}else{
		res = {
			success: true,
			message: "数据为空",
			data: []
		}
	}

	return {
		res
	};
}
