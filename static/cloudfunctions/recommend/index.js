const addHotWord = require('./hotWord/addHotWord');
const getHotwords = require('./hotWord/getHotwords');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addHotWord':
			return await addHotWord.main(event, context);
		case 'getHotwords':
			return await getHotwords.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
