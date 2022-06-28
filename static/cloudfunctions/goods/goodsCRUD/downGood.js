// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	let res = {};

	const {
		goodId
	} = event;

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		const log = cloud.logger();

		const ans = await goodDb.doc(goodId).update({
			data: {
				status: false,
			}
		});
		log.info({
			name: 'downGood',
			message: `用户 ${openid} 成功下架了 ${goodId} 商品`,
			data: ans
		});

		res = {
			sucess: true,
			message: "",
			data: ans
		}
	} catch (e) {
		log.error({
			name: 'downGood',
			message: `用户 ${openid} 下架 ${goodId} 商品失败`,
			data: e
		});
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
