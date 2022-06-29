// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 商家端发货
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const openid = wxContext.OPENID;

	const _ = db.command;

	const log = cloud.logger();

	const {
		orderId,
		goodId
	} = event;

	let res = {};

	try {
		const goodOrderDb = db.collection('good-orders');
		const orderDb = db.collection('order');
		const goodDb = db.collection('goods');

		const temp = await goodOrderDb.where({
			goodId: _.eq(goodId),
			orderId: _.eq(orderId)
		}).update({
			data: {
				status: 3
			}
		});

		const resArr = await Promise.all([goodDb.doc(goodId).get(), goodOrderDb.where({
			goodId: _.eq(goodId),
			orderId: _.eq(orderId)
		}).get()]);

		const touserId = resArr[1].data[0]._openid;

		log.info({
			resArr: resArr
		})

		sendMsgToUser(touserId, {
			orderId: orderId,
			goodName: resArr[0].data.goodName
		});

		log.info({
			name: 'deliverGoodMerchant',
			message: `商家 ${openid} 已发货，并通知${touserId}用户`
		})

		res = {
			success: true,
			message: "发货成功",
			data: temp
		}
	} catch (e) {
		console.trace(e);
		res = {
			success: false,
			message: "发货失败",
			data: e
		}
	}

	return res;
}


/**
 * 商家成功发货后，通知对应的用户
 * @param {String} shopId 
 * @param {*} shopDb 
 * @param {*} info 
 */
async function sendMsgToUser(userId, info) {

	cloud.callFunction({
		// 要调用的云函数名称
		name: 'subcribe',
		// 传递给云函数的参数
		data: {
			type: 'sendMessage',
			touserId: userId,
			page: 'pages/Tourists/Order/Order?index=1',
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
					"value": '已发货'
				},
				// 备注
				thing10: {
					"value": '无'
				},
				// 操作提示
				thing4: {
					"value": '已发货，请耐心等待'
				}
			}
		}
	});
}
