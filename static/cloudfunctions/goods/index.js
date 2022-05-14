const getFirstCategory = require("./category/getFirstCategory");
const getSeondCategory = require('./category/getSecondCategory');

const addGood = require('./goodsCRUD/addGood');
const getGoods = require('./goodsCRUD/getGoods');
const getGoodById = require('./goodsCRUD/getGoodById');
const updateGoodById = require('./goodsCRUD/updateGoodById');
const deleteGoodById = require('./goodsCRUD/deleteGoodById');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'getFirstCategory':
			return await getFirstCategory.main(event, context);
		case 'getSeondCategory':
			return await getSeondCategory.main(event, context);
		case 'addGood':
			return await addGood.main(event, context);
		case 'getGoods':
			return await getGoods.main(event, context);
		case 'getGoodById':
			return await getGoodById.main(event, context);
		case 'updateGoodById':
			return await updateGoodById.main(event, context);
		case 'deleteGoodById':
			return await deleteGoodById.main(event, context);
		default:
			return {};
	}
}