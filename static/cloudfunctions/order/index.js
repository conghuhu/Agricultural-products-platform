const createOrder = require('./CreateOrder/index');
const payOrder = require('./payOrder/index');
const cancelOrder = require('./cancelOrder/index');

const queryUnpaidOrders = require('./queryUnpaidOrders/index');
const queryIngOrders = require('./queryIngOrders/index');
const queryEvaluateOrder = require('./queryEvaluateOrder/index');
const queryCompletedOrders = require('./queryCompletedOrders/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'createOrder':
			return await createOrder.main(event, context);
		case 'payOrder':
			return await payOrder.main(event, context);
		case 'cancelOrder':
			return await cancelOrder.main(event, context);
		case 'queryUnpaidOrders':
			return await queryUnpaidOrders.main(event, context);
		case 'queryIngOrders':
			return await queryIngOrders.main(event, context);
		case 'queryEvaluateOrder':
			return await queryEvaluateOrder.main(event, context);
		case 'queryCompletedOrders':
			return await queryCompletedOrders.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
