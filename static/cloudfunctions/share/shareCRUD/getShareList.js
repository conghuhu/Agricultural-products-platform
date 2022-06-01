// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const _ = db.command;

	const {
		value
	} = event;

	let res = {};

	try {
		const shareDb = db.collection('share');

		let shareList;

		if (value) {
			shareList = await shareDb
				.aggregate()
				.match({
					title: db.RegExp({
						//从搜索栏中获取的value作为规则进行匹配。
						regexp: value,
						//大小写不区分
						options: 'i',
					})
				})
				.lookup({
					from: 'users',
					localField: '_openid',
					foreignField: '_openid',
					as: 'author',
				})
				.end();
		} else {
			shareList = await shareDb
				.aggregate()
				.lookup({
					from: 'users',
					localField: '_openid',
					foreignField: '_openid',
					as: 'author',
				})
				.end();
		}

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
