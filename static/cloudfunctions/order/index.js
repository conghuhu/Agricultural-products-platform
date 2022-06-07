const createOrder = require('./CreateOrder/index');
const payOrder = require('./payOrder/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'createOrder':
			return await createOrder.main(event, context);
		case 'payOrder':
			return await payOrder.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
