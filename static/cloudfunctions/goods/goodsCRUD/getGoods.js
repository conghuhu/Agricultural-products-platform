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
		shopId,
		keyword
	} = event;

	let res = {};

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		let temp;

		if (keyword && keyword != "") {
			temp = await goodDb.where(_.and([{
						status: true
					},
					_.or([{
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
					])
				]))
				.orderBy('createTime', 'desc')
				.get();
		} else {
			temp = await goodDb.where({
					shopId: _.eq(shopId),
					status: true
				}).orderBy('createTime', 'desc')
				.get();
		}

		res = {
			success: true,
			message: "",
			data: temp.data
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			success: false,
			message: "获取商品列表失败",
			data: null
		}
	}

	return res;
}
