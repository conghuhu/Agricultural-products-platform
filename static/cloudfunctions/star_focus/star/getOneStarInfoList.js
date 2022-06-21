// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 获取某人点赞种草信息列表
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	let res = {};

	const _ = db.command;

	try {
		const starDb = db.collection('star');
		const shareDb = db.collection('share');
		const {
			data
		} = await starDb.where({
			_openid: openid,
			type: 1
		}).get();

		const actionList = data.map(item => {
			return shareDb
				.aggregate()
				.match({
					_id: _.eq(item.shareId)
				})
				.lookup({
					from: 'users',
					localField: '_openid',
					foreignField: '_openid',
					as: 'author',
				})
				.sort({
					createTime: -1
				})
				.end();
		});

		const temp = await Promise.all(actionList);

		res = {
			sucess: true,
			message: "",
			data: temp.map(item => item.list[0]),
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
