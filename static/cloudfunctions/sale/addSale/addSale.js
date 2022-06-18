// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	
	const goodDb = db.collection('sales');
	const _ = db.command;
	
	const {
		goodId,createTime,goodNums,goodTotalPrice
	} = event;
    const newTime=dayjs(createTime).format('DD/MM/YYYY');
	console.log(newTime);
    console.log(goodId);
	console.log(goodNums);
	try {
		const temp = await goodDb.add({
			data: {
				goodId: goodId,
				newTime: newTime,
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
