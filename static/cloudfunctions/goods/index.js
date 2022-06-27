const getFirstCategory = require("./category/getFirstCategory");
const getSeondCategory = require('./category/getSecondCategory');

const addGood = require('./goodsCRUD/addGood');
const getGoods = require('./goodsCRUD/getGoods');
const getGoodById = require('./goodsCRUD/getGoodById');
const updateGoodById = require('./goodsCRUD/updateGoodById');
const deleteGoodById = require('./goodsCRUD/deleteGoodById');
const getAllCategory = require('./category/getAllCategory')
const getGoodsByLocation = require('./goodsCRUD/getGoodsByLocation');
const getGoodsByScdCategoryId = require('./goodsCRUD/getGoodsByScdCategoryId');
const getGoodsByKeyword = require('./goodsCRUD/getGoodsByKeyword');
const downGood = require('./goodsCRUD/downGood');


/**
 * 初始化controllerMap
 */
const controllerMap = new Map([
	['getFirstCategory', getFirstCategory],
	['getSeondCategory', getSeondCategory],
	['addGood', addGood],
	['getGoods', getGoods],
	['getGoodById', getGoodById],
	['updateGoodById', updateGoodById],
	['deleteGoodById', deleteGoodById],
	['getAllCategory', getAllCategory],
	['getGoodsByLocation', getGoodsByLocation],
	['getGoodsByScdCategoryId', getGoodsByScdCategoryId],
	['getGoodsByKeyword', getGoodsByKeyword],
	['downGood', downGood]
]);

// 云函数入口函数
exports.main = async (event, context) => {
	const type = event.type;
	if (controllerMap.has(type)) {
		console.log(controllerMap.get(type))
		return await controllerMap.get(type).main(event, context);
	} else {
		return {
			success: false,
			message: '未找到指定的函数，请检查type',
			data: null,
		};
	}
}
