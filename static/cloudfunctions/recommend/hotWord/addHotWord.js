// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		keyword
	} = event;

	const _ = db.command;

	let res = {};

	try {
		const hotWordDb = db.collection('hot-words');

		const isAbsent = await hotWordDb.where({
			keyword: _.eq(keyword)
		}).get();

		if (isAbsent.data.length > 0) {
			hotWordDb.where({
				keyword: _.eq(keyword)
			}).update({
				data: {
					count: _.inc(1),
					updateTime: new Date()
				}
			});
		} else {
			hotWordDb.add({
				data: {
					keyword: keyword,
					createTime: new Date(),
					updateTime: new Date(),
					count: 1,
				}
			});
		}

		res = {
			sucess: true,
			message: "",
			data: null
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
