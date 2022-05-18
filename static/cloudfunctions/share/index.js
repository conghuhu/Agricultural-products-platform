const addShare = require('./shareCRUD/addShare');
const deleteShareById = require('./shareCRUD/deleteShareById');
const getOneShareList = require('./shareCRUD/getOneShareList');
const getShareById = require('./shareCRUD/getShareById');
const getShareList = require('./shareCRUD/getShareList');


// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'addShare':
			return await addShare.main(event, context);
		case 'deleteShareById':
			return await deleteShareById.main(event, context);
		case 'getOneShareList':
			return await getOneShareList.main(event, context);
		case 'getShareById':
			return await getShareById.main(event, context);
		case 'getShareList':
			return await getShareList.main(event, context);
		default:
			return {
				success: false,
					message: '未找到指定的函数，请检查type',
					data: null,
			};
	}
}
