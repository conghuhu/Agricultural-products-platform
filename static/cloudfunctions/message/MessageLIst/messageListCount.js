// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openId = wxContext.OPENID;

	const {
		m_openId
	} = event;
	let res = {};
	try {
		const msgDb = db.collection('chat-msgs');
		const _ = db.command;
		const $ = db.command.aggregate;

		const {list} = await msgDb.aggregate().match({
				m_openId: _.eq(openId),
				read:_.eq("0")
			}).group({
				_id:'$openId',
				num:$.sum(1)
			})
			.end();

		
		res = {
			sucess: true,
			message: "",
			data: list
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
