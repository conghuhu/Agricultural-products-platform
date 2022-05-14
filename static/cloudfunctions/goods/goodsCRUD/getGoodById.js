// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const {
		goodId
	} = event;

	const goodDb = db.collection('goods');
	const _ = db.command;

	const {
		data
	} = await goodDb.doc(goodId).get();

	const categoryDb = db.collection('category');

	const temp = await Promise.all([categoryDb.where({
		_id: _.eq(data.firstCategoryId)
	}).get(), categoryDb.where({
		_id: _.eq(data.secondCategoryId)
	}).get()]);

	data.firstCategoryName = temp[0].data.length > 0 ? temp[0].data[0].name : "";
	data.secondCategoryName = temp[1].data.length > 0 ? temp[1].data[0].name : "";

	let res = {};
	res = {
		sucess: true,
		message: "",
		data: data,
	}

	return res;
}
