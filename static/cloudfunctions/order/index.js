const createOrder = require('./CreateOrder/index');
const payOrder = require('./payOrder/index');
const cancelOrder = require('./cancelOrder/index');

const queryUnpaidOrders = require('./queryUnpaidOrders/index');
const queryIngOrders = require('./queryIngOrders/index');
const queryEvaluateOrder = require('./queryEvaluateOrder/index');
const queryCompletedOrders = require('./queryCompletedOrders/index');
const queryOrderStatus = require('./queryOrderStatus/index');

const confirmDeliveryGood = require('./ConfirmDeliveryGood/index');
const queryIngGoods = require('./queryIngGoods/index');
const queryEvaluateGoods = require('./queryEvaluateGoods/index');
const completeOrderComment = require('./completeOrderComment/index')
const applyRefund = require('./applyRefund/index');
const queryRefundGood = require('./queryRefundGood/index');

// 商家端
const queryUnpaidOrdersMerchant = require('./merchantsOrder/queryUnpaidOrders');
const queryIngGoodsMerchant = require('./merchantsOrder/queryIngGoodsMerchant');
const queryEvaluateGoodsMerchant = require('./merchantsOrder/queryEvaluateGoodsMerchant');
const queryRefundGoodMerchant = require('./merchantsOrder/queryRefundGoodMerchant');
const queryOrderStatusMerchant = require('./merchantsOrder/queryOrderStatusMerchant');
const deliverGoodMerchant = require('./merchantsOrder/deliverGoodMerchant');

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
		case 'queryOrderStatus':
			return await queryOrderStatus.main(event, context);
		case 'confirmDeliveryGood':
			return await confirmDeliveryGood.main(event, context);
		case 'queryIngGoods':
			return await queryIngGoods.main(event, context);
		case 'queryEvaluateGoods':
			return await queryEvaluateGoods.main(event, context);
		case 'completeOrderComment':
			return await completeOrderComment.main(event, context);
		case 'applyRefund':
			return await applyRefund.main(event, context);
		case 'queryRefundGood':
			return await queryRefundGood.main(event, context);
		case 'queryUnpaidOrdersMerchant':
			return await queryUnpaidOrdersMerchant.main(event, context);
		case 'queryIngGoodsMerchant':
			return await queryIngGoodsMerchant.main(event, context);
		case 'queryEvaluateGoodsMerchant':
			return await queryEvaluateGoodsMerchant.main(event, context);
		case 'queryRefundGoodMerchant':
			return await queryRefundGoodMerchant.main(event, context);
		case 'queryOrderStatusMerchant':
			return await queryOrderStatusMerchant.main(event, context);
		case 'deliverGoodMerchant':
			return await deliverGoodMerchant.main(event,context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
