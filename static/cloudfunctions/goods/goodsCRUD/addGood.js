// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const goodDb = db.collection('goods');
	const _ = db.command;
	const {
		form
	} = event;

	const shopDb = db.collection('shops');

	const {
		data: shopData
	} = await shopDb.where({
		_openid: _.eq(wxContext.OPENID)
	}).get();

	if (shopData.length == 0) {
		return {
			sucess: false,
			message: "当前您没有创建商铺",
			data: null
		}
	}

	let res = {};
	const temp = await goodDb.add({
		data: {
			shopId: shopData[0]._id,
			...form
		}
	})
	res = {
		sucess: true,
		message: "",
		data: temp
	}

	return res;
}
