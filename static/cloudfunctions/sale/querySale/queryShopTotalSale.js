// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");

// 查询商家的总收入
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const saleDb = db.collection('sales');
	const _ = db.command;
	const $ = db.command.aggregate;

	const {
		shopId
	} = event;

	try {
		const result = await saleDb.aggregate()
			.lookup({
				from: 'goods',
				localField: 'goodId',
				foreignField: '_id',
				as: 'goodInfoList',
			})
			.project({
				goodInfo: $.arrayElemAt(['$goodInfoList', 0]),
				goodId: 1,
				newTime: 1,
				goodNums: 1,
				goodTotalPrice: 1
			})
			.replaceRoot({
				newRoot: $.mergeObjects(['$goodInfo', '$$ROOT'])
			})
			.project({
				goodInfo: 0,
				location: 0,
				mode: 0,
				secondCategoryId: 0,
				firstCategoryId: 0,
				unit: 0,
				specification: 0,
				originPlace: 0,
				description: 0,
				expirationDate: 0,
				goodName: 0,
				imageShowList: 0,
				status: 0,
				adcode: 0
			})
			.match({
				shopId: _.eq(shopId)
			})
			.group({
				_id: null,
				totalSale: $.sum('$goodTotalPrice')
			})
			.end();


		res = {
			sucess: true,
			message: "",
			data: result.list[0]
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
