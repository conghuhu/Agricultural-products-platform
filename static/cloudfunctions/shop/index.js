const checkCreatedShop = require('./checkCreatedShop/index');
const createShop = require('./createShop/index');
const getShopInfo = require('./getShopInfo/index');
const editShop = require('./editShop/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'checkCreatedShop':
			return await checkCreatedShop.main(event, context);
		case 'createShop':
			return await createShop.main(event, context);
		case 'getShopInfo':
			return await getShopInfo.main(event, context);
		case 'editShop':
			return await editShop.main(event,context);
		default:
			return {
				success: false,
				message: '未找到指定的函数，请检查type',
				data: null,
			};
	}
}
