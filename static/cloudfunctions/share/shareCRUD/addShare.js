// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		form
	} = event;

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {
		const shareDb = db.collection('share');

		const temp = await shareDb.add({
			data: {
				...form,
				_openid: openid,
				createTime: new Date(),
				updateTime: new Date(),
				star: 0,
				focus: 0,
				comments: 0
			}
		});

		res = {
			sucess: true,
			message: "",
			data: temp
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
