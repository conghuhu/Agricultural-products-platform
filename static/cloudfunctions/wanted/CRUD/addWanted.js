// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const openid = wxContext.OPENID;
	const {
		goodId,
		count
	} = event;

	const _ = db.command;

	const wantDb = db.collection('wanted');
	let res = {};

	try {
		let temp;
		if (count == 1) {
			// 初次加入
			temp = await wantDb.add({
				data: {
					_openid: openid,
					goodId: goodId,
					count: 1
				}
			});
		} else {
			// 增加count
			temp = await wantDb.where({
				_openid: _.eq(openid),
				goodId: _.eq(goodId)
			}).update({
				data: {
					count: _.inc(1)
				}
			});
		}
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
