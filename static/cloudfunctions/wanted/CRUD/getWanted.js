// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openid = wxContext.OPENID;

	const _ = db.command;

	const wantDb = db.collection('wanted');
	let res = {};

	try {
		// 获取某个人的菜篮子列表
		const temp = await wantDb
			.aggregate()
			.match({
				_openid: _.eq(openid)
			})
			.lookup({
				from: 'goods',
				localField: 'goodId',
				foreignField: '_id',
				as: 'goodInfo',
			})
			.end();
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
