// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const {
		secondCategoryId
	} = event;

	let res = {};

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;
		const {
			data
		} = await goodDb
			.where({
				secondCategoryId: _.eq(secondCategoryId)
			})
			.get();
		res = {
			sucess: true,
			message: "",
			data: data,
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
