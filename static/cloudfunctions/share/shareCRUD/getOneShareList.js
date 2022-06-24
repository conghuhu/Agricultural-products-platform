// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 获取某人发布的种草信息列表
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {

		const shareDb = db.collection('share');
		const temp = await shareDb
			.aggregate()
			.match({
				_openid: _.eq(openid)
			})
			.lookup({
				from: 'users',
				localField: '_openid',
				foreignField: '_openid',
				as: 'author',
			})
			.sort({
				createTime: -1
			}).end();

		res = {
			sucess: true,
			message: "",
			data: temp.list,
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
