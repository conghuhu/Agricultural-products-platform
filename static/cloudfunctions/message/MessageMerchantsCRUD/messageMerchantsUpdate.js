// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	let res = {};

	const {
		message
	} = event;

	try {
		const msgDb = db.collection('chat-msgs');
		const _ = db.command;

		const msgId = message._id;

		const ans = await msgDb.doc(msgId).update({
			data: {
				m_read:"1"		
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
