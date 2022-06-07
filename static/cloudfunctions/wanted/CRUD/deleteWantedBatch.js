// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openid = wxContext.OPENID;
	const {
		wantList,
	} = event;

	const _ = db.command;


	let res = {};

	try {
		const wantDb = db.collection('wanted');

		for (let i = 0; i < wantList.length; i++) {
			const item = wantList[i];
			wantDb.doc(item).remove();
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
			message: "错误，请检查",
			data: e
		}
	}

	return res;
}
