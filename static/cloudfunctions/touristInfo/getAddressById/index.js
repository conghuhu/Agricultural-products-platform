// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const {
		addressId
	} = event;
	let res;
	try {
		const userDb = db.collection('address');
		const _ = db.command;

		const temp = await userDb.doc(addressId).get();

		res = {
			success: true,
			message: "",
			data: temp.data
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "",
			data: null
		}
	}

	return res;
}
