// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 扣除金额
exports.main = async (event, context) => {

	const {
		openid,
		price
	} = event;

	let res = {};

	const _ = db.command;

	try {
		const userDb = db.collection('users');
		const {
			data
		} = await userDb.where({
			_openid: openid
		}).get();
		if (data[0].money >= price) {
			const temp = await userDb.where({
				_openid: openid
			}).update({
				data: {
					money: _.inc(-Number(price))
				}
			});

			res = {
				sucess: true,
				message: "",
				data: temp
			}
		} else {
			res = {
				sucess: false,
				message: "余额不足",
				data: null
			}
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
