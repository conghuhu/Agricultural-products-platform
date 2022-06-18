const getMoneyBalance = require('./money/getMoneyBalance');
const decrementMoney = require('./money/decrementMoney');
const userOpenId = require('./userInfo/userOpenId')
// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'getMoneyBalance':
			return await getMoneyBalance.main(event, context);
		case 'decrementMoney':
			return await decrementMoney.main(event, context);
		case 'userOpenId':
			return await userOpenId.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
