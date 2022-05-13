const checkCreatedShop = require('./checkCreatedShop/index');
const createShop = require('./createShop/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'checkCreatedShop':
			return await checkCreatedShop.main(event, context);
		case 'createShop':
			return await createShop.main(event, context);
		default:
			return {};
	}
}
