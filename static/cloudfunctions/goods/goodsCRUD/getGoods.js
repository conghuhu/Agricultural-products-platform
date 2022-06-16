// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
/**
 * 获取某个商铺商品信息
 * @param {*} event 
 * @param {*} context 
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		shopId
	} = event;
	let res = {};
	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		const {
			data
		} = await goodDb.where({
				shopId: _.eq(shopId),
				status: true
			}).orderBy('createTime', 'desc')
			.get();

		
		res = {
			sucess: true,
			message: "",
			data: data
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			sucess: false,
			message: "获取商品列表失败",
			data: null
		}
	}

	return res;
}
