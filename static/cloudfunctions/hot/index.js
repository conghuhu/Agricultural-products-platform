const getHotGoods = require('./HotGoods/index');

/**
 * 初始化controllerMap
 */
const controllerMap = new Map([
	['getHotGoods', getHotGoods],
]);

// 云函数入口函数
exports.main = async (event, context) => {
	const type = event.type;
	if (controllerMap.has(type)) {
		return await controllerMap.get(type).main(event, context);
	} else {
		return {
			success: false,
			message: '未找到指定的函数，请检查type',
			data: null,
		};
	}
}
