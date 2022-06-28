// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const log = cloud.logger();

	const _ = db.command;

	const openId = wxContext.OPENID;

	const {
		touserId,
		page,
		templateId,
		templateData
	} = event;

	try {
		const orderMsgDb = db.collection('order-message');

		// 发送订阅消息
		const res = await cloud.openapi.subscribeMessage.send({
			"touser": touserId,
			"page": page,
			"data": templateData,
			"templateId": templateId,
			"miniprogramState": 'developer',
		});

		log.info({
			name: 'sendMessage',
			message: `向${touserId}发送消息`,
			data: res,
			content: templateData
		})

		// 发送成功后将消息的状态改为已发送
		// return db
		// 	.collection('messages')
		// 	.doc(message._id)
		// 	.update({
		// 		data: {
		// 			done: true,
		// 		},
		// 	});

		return {
			sucess: true,
			message: '',
			data: null
		};
	} catch (e) {
		console.trace(e);
		//TODO handle the exception
		return {
			sucess: false,
			message: '',
			data: e
		};
	}
}
