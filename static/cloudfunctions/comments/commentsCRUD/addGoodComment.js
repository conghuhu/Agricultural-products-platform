// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()

	const {
		goodsComments
	} = event;

	const commentDb = db.collection('goods_comments');
	const _ = db.command

	const result = await commentDb.add({
		data: {
			...goodsComments
		}
	})

	let res = {

	};
	res = {
		success: true,
		message: '',
		data: result
	}

	return {
		res
	};
}
