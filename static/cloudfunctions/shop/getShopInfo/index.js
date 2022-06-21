// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 获取商铺信息
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();


	const _ = db.command;

	const {
		shopId
	} = event;

	let res = {};

	try {
		const shopDb = db.collection('shops');
		
		const record = await shopDb.doc(shopId).get();

		res = {
			success: true,
			message: "",
			data: record.data
		};
	} catch (e) {
		console.trace(e);
		res = {
			success: true,
			message: "获取商铺信息异常",
			data: null
		}
	}

	return res;
}
