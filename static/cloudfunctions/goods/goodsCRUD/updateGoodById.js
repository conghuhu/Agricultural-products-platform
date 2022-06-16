// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	let res = {};

	const {
		form
	} = event;

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		const goodId = form._id;
		delete form._id;

		const ans = await goodDb.doc(goodId).update({
			data: {
				...form,
				goodPrice: Number(form.goodPrice)
			}
		})

		res = {
			sucess: true,
			message: "",
			data: ans
		}
	} catch (e) {
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
