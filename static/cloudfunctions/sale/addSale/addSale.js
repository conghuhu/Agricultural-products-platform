// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	
	const goodDb = db.collection('sales');
	const _ = db.command;
	
	const {
		goodId,createTime,goodNums,goodTotalPrice
	} = event;

    console.log(goodId);
	console.log(goodNums);
	try {
		const temp = await goodDb.add({
			data: {
				goodId: goodId,
				createTime: createTime,
				goodNums: goodNums,
				goodTotalPrice: goodTotalPrice
			}
		})
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