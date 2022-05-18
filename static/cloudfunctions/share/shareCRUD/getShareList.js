// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const _ = db.command;

	let res = {};

	try {
		const shareDb = db.collection('share');

		// const shareList = await shareDb.get();

		const shareList = await shareDb
			.aggregate()
			.lookup({
				from: 'users',
				localField: '_openid',
				foreignField: '_openid',
				as: 'author',
			})
			.end();
			
			console.log(shareList)


		res = {
			sucess: true,
			message: "",
			data: shareList.list
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
