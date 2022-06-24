// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const saleDb = db.collection('sales');
	const _ = db.command;
	const $ = db.command.aggregate;

	const {
		goodId
	} = event;

	try {
		let monthSaleDate1 = [0, 0, 0, 0, 0, 0, 0];
		for (let j = 0; j < 7; j++) {
			const t1 = new Date().getTime();
			const t2 = (j + 1) * 86400000;
			const t3 = new Date(t1 - t2);
			const t4 = dayjs(t3).format('YYYY-MM-DD');
			monthSaleDate1[6 - j] = t4;
		}
		console.log(monthSaleDate1);
		const querySalesMonth1 = await saleDb
			.where({
				goodId: goodId,
				newTime: _.in(monthSaleDate1)
			})
			.field({
				goodId: true,
				newTime: true,
				goodNums: true
			})
			.get()
		let sum1 = 0;
		for (let i = 0; i < querySalesMonth1.data.length; i++) {
			sum1 = sum1 + querySalesMonth1.data[i].goodNums;
		}
		let monthSaleDate2 = [0, 0, 0, 0, 0, 0, 0];
		for (let j = 7; j < 14; j++) {
			const t1 = new Date().getTime();
			const t2 = (j + 1) * 86400000;
			const t3 = new Date(t1 - t2);
			const t4 = dayjs(t3).format('YYYY-MM-DD');
			monthSaleDate2[6 - j + 7] = t4;
		}
		const querySalesMonth2 = await saleDb
			.where({
				goodId: goodId,
				newTime: _.in(monthSaleDate2)
			})
			.field({
				goodId: true,
				newTime: true,
		 	goodNums: true
			})
			.get()
		let sum2 = 0;
		for (let i = 0; i < querySalesMonth2.data.length; i++) {
			sum2 = sum2 + querySalesMonth2.data[i].goodNums;
		}

		let monthSaleDate3 = [0, 0, 0, 0, 0, 0, 0];
		for (let j = 14; j < 21; j++) {
			const t1 = new Date().getTime();
			const t2 = (j + 1) * 86400000;
			const t3 = new Date(t1 - t2);
			const t4 = dayjs(t3).format('YYYY-MM-DD');
			monthSaleDate3[6 - j + 14] = t4;
		}
		const querySalesMonth3 = await saleDb
			.where({
				goodId: goodId,
				newTime: _.in(monthSaleDate3)
			})
			.field({
				goodId: true,
				newTime: true,
				goodNums: true
			})
			.get()
		let sum3 = 0;
		for (let i = 0; i < querySalesMonth3.data.length; i++) {
			sum3 = sum3 + querySalesMonth3.data[i].goodNums;
		}

		let monthSaleDate4 = [0, 0, 0, 0, 0, 0, 0];
		for (let j = 21; j < 28; j++) {
			const t1 = new Date().getTime();
			const t2 = (j + 1) * 86400000;
			const t3 = new Date(t1 - t2);
			const t4 = dayjs(t3).format('YYYY-MM-DD');
			monthSaleDate4[6 - j + 21] = t4;
		}
		const querySalesMonth4 = await saleDb
			.where({
				goodId: goodId,
				newTime: _.in(monthSaleDate4)
			})
			.field({
				goodId: true,
				newTime: true,
				goodNums: true
			})
			.get()
		let sum4 = 0;
		for (let i = 0; i < querySalesMonth4.data.length; i++) {
			sum4 = sum4 + querySalesMonth4.data[i].goodNums;
		}
		let sumList = [sum1, sum2, sum3, sum4];
		res = {
			sucess: true,
			message: "",
			data: sumList
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
