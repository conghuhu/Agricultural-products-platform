// 云函数入口文件
const addSale = require('./addSale/addSale');
const querySale = require('./querySale/querySale');
const querySaleMonth = require('./querySale/querySaleMonth');
const queryShopTotalSale = require('./querySale/queryShopTotalSale');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addSale':
			return await addSale.main(event, context);
		case 'querySale':
			return await querySale.main(event, context);
		case 'querySaleMonth':
			return await querySaleMonth.main(event, context);
		case 'queryShopTotalSale':
			return await queryShopTotalSale.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
