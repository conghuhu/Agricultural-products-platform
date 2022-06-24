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
    const $ = db.command.aggregate;
	
	const {
		goodId,openId,createTime,goodNums,goodTotalPrice
	} = event;
    console.log(dayjs(createTime).format('YYYY-MM-DD'));
	try {
		const temp = await goodDb.add({
			data: {
				goodId: goodId,
				openId: openId,
				newTime: dayjs(createTime).format('YYYY-MM-DD'),
				goodNums: goodNums,
				goodTotalPrice: goodTotalPrice
			}
		})
		console.log(temp);
		res = {
			success: true,
			message: "",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
