const subcribeOrderMessage = require('./subcribeOrderMessage/index');
const sendMessage = require('./messageSend/sendMessage');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'subcribeOrderMessage':
			return await subcribeOrderMessage.main(event, context);
		case 'sendMessage':
			return await sendMessage.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
