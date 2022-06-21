// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openId = wxContext.OPENID;


	let res = {};
	try {
		const msgDb = db.collection('chat-msgs');
		const _ = db.command;
		const $ = db.command.aggregate;

		const {
			list
		} = await msgDb.aggregate().match({
				openId: _.eq(openId),
				t_read: _.eq("0")
			}).group({
				_id: '$m_openId',
				num: $.sum(1)
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
