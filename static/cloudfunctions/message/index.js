const messageAdd = require('./MessageCRUD/messageAdd');
const messageGet = require('./MessageCRUD/messageGet')
const messageListGet = require('./MessageLIst/messageListGet')
const messageListCount = require('./MessageLIst/messageListCount')
const messageMerchantsGet = require('./MessageMerchantsCRUD/messageMerchantsGet')
const messageMerchantsAdd = require('./MessageMerchantsCRUD/messageMerchantsAdd')
// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'messageAdd':
			return await messageAdd.main(event, context);
		case 'messageGet':
			return await messageGet.main(event, context);
		case 'messageListGet':
			return await messageListGet.main(event, context);
		case 'messageListCount':
			return await messageListCount.main(event, context);
		case 'messageMerchantsGet':
			return await messageMerchantsGet.main(event, context);
		case 'messageMerchantsAdd':
			return await messageMerchantsAdd.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
