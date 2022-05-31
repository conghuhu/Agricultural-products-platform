const addWanted = require('./CRUD/addWanted');
const getWanted = require('./CRUD/getWanted');
const deleteWanted = require('./CRUD/deleteWanted');
const changeChecked = require('./CRUD/changeChecked');

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addWanted':
			return await addWanted.main(event, context);
		case 'getWanted':
			return await getWanted.main(event, context);
		case 'deleteWanted':
			return await deleteWanted.main(event, context);
		case 'changeChecked':
			return await changeChecked.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
