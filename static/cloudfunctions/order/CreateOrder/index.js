// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	const log = cloud.logger();

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
		const shopDb = db.collection('shops');
		
		// 1.将订单入库
		const addRes = await orderDb.add({
			data: {
				createTime: new Date(),
				updateTime: new Date(),
				// 订单状态 1：待支付  2：已付款，但未收到货  3：已收到货，待评价 4：彻底完成
				status: 1,
				curLocationId,
				remarkVal,
				goodList: goodList.map(item => {
					// [goodId,数量，单价]
					return [
						item._id,
						item.count,
						item.goodPrice
					]
				}),
				price,
				_openid: openid
			}
		});

		log.info({
			name: 'createOrder',
			message: `用户 ${openid} 创建了 ${addRes._id} 订单`,
			data: addRes
		})

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
					count: item.count,
					// send 是否已发货
					send: false
				}
			});
			goodOrderIdList.push(goodOrderRes._id);

			sendMsgToShopUser(item.shopId, shopDb, {
				orderId: addRes._id,
				goodName: item.goodName,
				remarkVal: remarkVal
			});
		}

		log.info({
			name: 'createOrder',
			message: `${addRes._id} 订单生成了各个商品订单`,
			data: goodOrderIdList
		});

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
			success: true,
			message: "下单成功",
			data: addRes._id
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "下单失败",
			data: e
		}
	}

	return res;
}

/**
 * 发送用户成功下单消息给商家
 * @param {String} shopId 
 * @param {*} shopDb 
 * @param {*} info 
 */
async function sendMsgToShopUser(shopId, shopDb, info) {
	const shopInfo = await shopDb.doc(shopId).get();

	cloud.callFunction({
		// 要调用的云函数名称
		name: 'subcribe',
		// 传递给云函数的参数
		data: {
			type: 'sendMessage',
			touserId: shopInfo.data._openid,
			page: 'pages/Merchants/OrderCenter/OrderCenter?index=0',
			templateId: 'Ig-MJxCd_nD9sYiext0EmxdDq0pQIJV2LgwUoZmB5Wg',
			templateData: {
				// 订单号
				character_string1: {
					"value": info.orderId
				},
				// 产品名称
				thing6: {
					"value": info.goodName
				},
				// 订单状态
				phrase2: {
					"value": '下单成功'
				},
				// 备注
				thing10: {
					"value": info.remarkVal || '无'
				},
				// 操作提示
				thing4: {
					"value": '用户已下单，但未支付'
				}
			}
		}
	});
}
