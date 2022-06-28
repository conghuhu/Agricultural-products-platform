// 云函数入口文件
const addView = require('./addView/addView');
const queryView = require('./queryView/queryView');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addView':
			return await addView.main(event, context);
		case 'queryView':
			return await queryView.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
