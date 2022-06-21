// 云函数入口文件
const addSale = require('./addSale/addSale');
const querySale = require('./querySale/querySale');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addSale':
			return await addSale.main(event, context);
		case 'querySale':
			return await querySale.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}