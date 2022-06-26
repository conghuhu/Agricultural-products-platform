// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const _ = db.command;

	const {
		form
	} = event;

	let res = {};
	try {
		const goodDb = db.collection('goods');
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
		const temp = await goodDb.add({
			data: {
				...form,
				shopId: shopData[0]._id,
				createTime: new Date(),
				updateTime: new Date(),
				status: true,
				goodPrice: Number(form.goodPrice),
				_openid: wxContext.OPENID,
				location: db.Geo.Point(form.location[0], form.location[1])
			}
		})
		res = {
			sucess: true,
			message: "",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
