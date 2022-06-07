const cancelDelayOrder = require('./cancelDelayOrder/index');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'cancelDelayOrder':
			return await cancelDelayOrder.main(event, context);
		default:
			return {}
	}
}
