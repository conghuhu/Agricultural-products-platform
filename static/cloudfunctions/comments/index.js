const addComments = require('./commentsCRUD/addComments')
const getComments = require('./commentsCRUD/getComments')
const addGoodsComments = require('./commentsCRUD/addGoodComment')
const getGoodsComment = require('./commentsCRUD/getGoodsComment')
// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addComments':
			return await addComments.main(event, context);
		case 'getComments':
			return await getComments.main(event, context);
		case 'addGoodsComments':
			return await addGoodsComments.main(event, context);
		case 'getGoodsComment':
			return await getGoodsComment.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};

	}
}
