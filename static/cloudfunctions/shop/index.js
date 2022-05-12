const checkCreatedShop = require('./checkCreatedShop/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'checkCreatedShop':
			return await checkCreatedShop.main(event, context);
	}
}
