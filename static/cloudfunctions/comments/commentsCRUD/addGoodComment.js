// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const openid = wxContext.OPENID

	const {
		goodsComments
	} = event;

	const commentDb = db.collection('goods_comments');
	const userDb =db.collection('users')
	const _ = db.command
	const {data} = await userDb.where({
		_openid:_.eq(openid)
	}).get()
	const goodComment = {
		...goodsComments,
		userInfo:{...data[0]}
	}
	console.log(data)
	console.log(goodComment)

	const result = await commentDb.add({
		data: {
			...goodComment
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
