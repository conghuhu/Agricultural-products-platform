// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	const {
		orderId
	} = event;

	let res = {};

	try {
		const orderDb = db.collection('order');
		const goodOrderDb = db.collection('good-orders');
		const saleDb = db.collection('sales');
		// doc获取的数据结构 .data就是数据
		const isAbsent = await orderDb.doc(orderId).get();

		const price = isAbsent.data.price;

		const moneyBalance = await cloud.callFunction({
			name: 'user',
			data: {
				type: 'getMoneyBalance',
				target_openid: openid
			}
		});

		if (price > moneyBalance.result.data) {
			return {
				success: false,
				message: "支付失败，余额不足",
				data: null
			}
		}

		// 更新订单状态
		const temp = await orderDb.doc(orderId).update({
			data: {
				updateTime: new Date(),
				status: 2,
			}
		});

		// 扣除用户金额
		await cloud.callFunction({
			// 要调用的云函数名称
			name: 'user',
			// 传递给云函数的参数
			data: {
				type: 'decrementMoney',
				openid: openid,
				price: price
			}
		});

		// 写入sale表，存好销量数据
		const goodList = isAbsent.data.goodList;
		const createTime = isAbsent.data.createTime;
		for (let i = 0; i < goodList.length; i++) {
			const goodSubList = goodList[i];
			const goodId = goodSubList[0];
			const goodNums = goodSubList[1];
			const goodPrice = goodSubList[2];
			const goodTotalPrice = goodPrice * goodNums;
			await cloud.callFunction({
				name: 'sale',
				data: {
					type: 'addSale',
					goodId: goodId,
					createTime: createTime,
					goodNums: goodNums,
					goodTotalPrice: goodTotalPrice
				}
			})
			// db.collection('sales').add({
			// 	  data: {
			// 	    // _id可选自定义 _id，在此处场景下用数据库自动分配的就可以了
			// 	    goodId: goodId,
			// 	    createTime: createTime
			// 	  }
			// })
		}

		const {
			data
		} = await orderDb.doc(orderId).get();


		// TODO 更新各个子订单的状态,并通知对应的商家
		for (let i = 0; i < data.goodList.length; i++) {
			const goodId = data.goodList[i][0];
			goodOrderDb.where({
				goodId: _.eq(goodId)
			}).update({
				data: {
					updateTime: new Date(),
					status: 2,
				}
			});
		}

		res = {
			success: true,
			message: "支付成功",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "支付失败",
			data: e
		}
	}

	return res;
}
