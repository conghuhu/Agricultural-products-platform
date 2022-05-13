// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const categoryDb = db.collection('category');
	const _ = db.command;
	
	let res = {};
	const record = await categoryDb.where({
		parentId: _.eq(null)
	}).get();
	res = {
		sucess: true,
		message: "",
		data: record.data
	}

	return res;
}
