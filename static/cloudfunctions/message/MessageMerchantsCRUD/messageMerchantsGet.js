// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const m_openId = wxContext.OPENID;

	const {
		openId
	} = event;
	let res = {};
	try {
		const msgDb = db.collection('chat-msgs');
		const _ = db.command;

		const {
			data
		} = await msgDb.where({
				openId: _.eq(openId),
				m_openId: _.eq(m_openId)
			}).orderBy('_createTime', 'asc')
			.get();

		
		res = {
			sucess: true,
			message: "",
			data: data
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			sucess: false,
			message: "获取商品列表失败",
			data: null
		}
	}

	return res;
}
