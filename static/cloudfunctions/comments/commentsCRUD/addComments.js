// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()

	const {
		comment
	} = event;

	const commentDb = db.collection('comments');
	const _ = db.command

	const result = await commentDb.add({
		data: {
			adcode: comment.adcode,
			createTime: new Date(),
			content: comment.content,
			comment_id: comment.comment_id,
			author: comment.author._openid,
			author_avatarUrl:comment.author.avatarUrl
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
