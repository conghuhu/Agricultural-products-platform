const getPloicy = require('./policy/getPloicy');
const getPloicyById = require('./policy/getPloicyById');

const getVideoList = require('./video/getVideoList');
const getVideoById = require('./video/getVideoById');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'getPloicy':
			return await getPloicy.main(event, context);
		case 'getPloicyById':
			return await getPloicyById.main(event, context);
		case 'getVideoList':
			return await getVideoList.main(event, context);
		case 'getVideoById':
			return await getVideoById.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
