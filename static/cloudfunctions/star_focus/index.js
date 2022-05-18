const addStar = require('./star/addStar');
const removeStar = require('./star/removeStar');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addStar':
			return await addStar.main(event, context);
		case 'removeStar':
			return await removeStar.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
