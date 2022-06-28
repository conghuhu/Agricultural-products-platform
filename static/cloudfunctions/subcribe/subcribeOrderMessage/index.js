const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

// 商家端订阅消息
exports.main = async (event, context) => {
	const log = cloud.logger();

	try {
		const {
			OPENID
		} = cloud.getWXContext();

		const {
			templateId
		} = event;

		// 在云开发数据库中存储商家订阅的订单状态通知
		const result = await db.collection('order-message').add({
			data: {
				_openid: OPENID, // 订阅者的openid
				page: 'index', // 订阅消息卡片点击后会打开小程序的哪个页面
				templateId: templateId, // 订阅消息模板ID
				done: false, // 消息发送状态设置为 false
			}
		});
		log.error({
			name: 'subcribeOrderMessage',
			message: `商家 ${OPENID} 订阅订单消息成功`,
			time: new Date()
		})
		return {
			success: true,
			message: "",
			data: result
		};
	} catch (err) {
		log.error({
			name: 'subcribeOrderMessage',
			message: `商家 ${OPENID} 订阅订单消息异常`,
			data: err,
			time: new Date()
		})
		return {
			success: false,
			message: "未知异常，请移步日志后台查看",
			data: null
		};
	}
};
