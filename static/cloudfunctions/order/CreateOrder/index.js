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
		curLocationId,
		remarkVal,
		goodList,
		wantList,
		price
	} = event;

	let res = {};

	try {
		const orderDb = db.collection('order');
		const goodOrderDb = db.collection('good-orders');
		// 1.将订单入库
		const addRes = await orderDb.add({
			data: {
				createTime: new Date(),
				updateTime: new Date(),
				// 订单状态 1：待支付  2：已付款，但未收到货  3：已收到货，待评价 4：彻底完成
				status: 1,
				curLocationId,
				remarkVal,
				goodList: goodList.map(item => item._id),
				price,
				_openid: openid
			}
		});
		// 2.RPC通知批量删除想要订单
		cloud.callFunction({
			// 要调用的云函数名称
			name: 'wanted',
			// 传递给云函数的参数
			data: {
				type: 'deleteWantedBatch',
				wantList
			}
		});

		// 3.生成各个商品的独自订单，并通知商品对应的商家
		const goodOrderIdList = [];
		for (let i = 0; i < goodList.length; i++) {
			const item = goodList[i];
			const goodOrderRes = await goodOrderDb.add({
				data: {
					createTime: new Date(),
					updateTime: new Date(),
					// 订单状态 1：用户已付款,待处理  2：派送中  3：已完成订单,用户待评价 4. 彻底完成
					status: 1,
					// 所属用户订单id
					orderId: addRes._id,
					goodId: item._id,
					// 消费者id
					_openid: openid,
					shopId: item.shopId,
				}
			});
			goodOrderIdList.push(goodOrderRes._id);
			console.log(goodOrderIdList)
		}
		
		// 4.开启15分钟定时器，时间到未付款，取消订单
		cloud.callFunction({
			// 要调用的云函数名称
			name: 'timer',
			// 传递给云函数的参数
			data: {
				type: 'cancelDelayOrder',
				orderId: addRes._id,
				goodOrderIdList: goodOrderIdList
			}
		});

		res = {
			sucess: true,
			message: "下单成功",
			data: addRes._id
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "下单失败",
			data: e
		}
	}

	return res;
}
