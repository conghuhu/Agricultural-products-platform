const messageAdd = require('./MessageCRUD/messageAdd');
const messageGet = require('./MessageCRUD/messageGet')
const messageListGet = require('./MessageLIst/messageListGet')
const messageListCount = require('./MessageLIst/messageListCount')
const messageMerchantsGet = require('./MessageMerchantsCRUD/messageMerchantsGet')
const messageMerchantsAdd = require('./MessageMerchantsCRUD/messageMerchantsAdd')
const messageListTouristsGet = require('./MessageListTourists/MessageListTouristsGet')
const messageListTouristsCount = require('./MessageListTourists/MessageListTouristsCount')
const messageUpdate = require('./MessageCRUD/messageUpdate')
const messageMerchantsUpdate = require('./MessageMerchantsCRUD/messageMerchantsUpdate')
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
		case 'messageListTouristsGet':
			return await messageListTouristsGet.main(event, context);
		case 'messageListTouristsCount':
			return await messageListTouristsCount.main(event, context);
		case 'messageUpdate':
			return await messageUpdate.main(event, context);
		case 'messageMerchantsUpdate':
			return await messageMerchantsUpdate.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
