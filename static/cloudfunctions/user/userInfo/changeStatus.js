// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	const log = cloud.logger();

	let res;

	try {
		const userDb = db.collection('users');


		const isAbsent = await userDb.where({
			_openid: openid
		}).get();

		if (isAbsent.data.length == 0) {
			return {
				success: false,
				message: "找不到用户，请检查",
				data: null
			}
		}

		const temp = await userDb.where({
			_openid: openid
		}).update({
			data: {
				status: isAbsent.data[0].status == 0 ? 1 : 0
			}
		});

		res = {
			success: true,
			message: "",
			data: temp
		}
	} catch (e) {
		//TODO handle the exception
		log.error({
			message: e,
			name: 'changeStatus'
		})
		res = {
			success: true,
			message: "",
			data: null
		}
	}

	return res;
}
