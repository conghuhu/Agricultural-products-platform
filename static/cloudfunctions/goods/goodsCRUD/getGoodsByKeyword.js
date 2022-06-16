// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 根据keyword获取商品
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		keyword, //搜索关键字
		orderType, // 排序方式
		priceOrder, // 价格升序还是降序
		latitude,
		longitude
	} = event;
	let res = {};

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		const {
			data
		} = await goodDb.where(_.or([{
					goodName: db.RegExp({
						//从搜索栏中获取的value作为规则进行匹配。
						regexp: keyword,
						//大小写不区分
						options: 'i',
					})
				},
				{
					description: db.RegExp({
						//从搜索栏中获取的value作为规则进行匹配。
						regexp: keyword,
						//大小写不区分
						options: 'i',
					})
				}
			]))
			.orderBy('goodPrice', priceOrder)
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
