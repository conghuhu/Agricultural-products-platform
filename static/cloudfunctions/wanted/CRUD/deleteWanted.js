// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openid = wxContext.OPENID;
	const {
		wantedId,
	} = event;

	const _ = db.command;

	const wantDb = db.collection('wanted');
	let res = {};

	try {
		let temp;
		const {
			data
		} = await wantDb.doc(wantedId).get();
		if (data.count == 1) {
			// 删除
			temp = await wantDb.doc(wantedId).remove();
		} else {
			// 自减
			temp = await wantDb.doc(wantedId).update({
				data: {
					count: _.inc(-1),
					updateTime: new Date(),
					checked: true,
				}
			})
		}
		res = {
			sucess: true,
			message: "",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "错误，请检查传值",
			data: e
		}
	}

	return res;
}
