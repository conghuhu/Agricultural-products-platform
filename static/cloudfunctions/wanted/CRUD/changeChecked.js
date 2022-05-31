// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openid = wxContext.OPENID;
	const {
		wantId,
		checked
	} = event;

	const _ = db.command;

	let res = {};

	try {
		const wantDb = db.collection('wanted');
		const temp = await wantDb.where({
			_id: wantId
		}).update({
			data: {
				checked: checked
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
