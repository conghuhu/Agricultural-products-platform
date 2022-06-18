const messageAdd = require('./MessageCRUD/messageAdd');
const messageGet = require('./MessageCRUD/messageGet')

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'messageAdd':
			return await messageAdd.main(event, context);
		case 'messageGet':
			return await messageGet.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
