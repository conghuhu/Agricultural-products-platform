// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

	const wxContext = cloud.getWXContext();

	const log = cloud.logger();

	const {
		createShopForm
	} = event;

	const {
		username,
		phone,
		shopName,
		description,
		shopAvatar
	} = createShopForm;

	const shopDb = db.collection('shops');
	const _ = db.command;

	const openId = wxContext.OPENID;

	const isAbsent = await shopDb.where({
		_openid: _.eq(openId)
	}).get();

	let res = {};

	if (isAbsent.data.length != 0) {
		const shopId = isAbsent.data[0]._id;
		console.log(shopId)
		const temp = await shopDb.doc(shopId).update({
			data:{
				username,
				phone,
				shopName,
				description,
				shopAvatar
			}
		});
		log.info({
			name: 'editShop',
			message: `修改商铺信息`,
			res: temp,
			data: createShopForm
		})
		res = {
			success: true,
			message: "修改成功",
			data: temp
		}
	} else {
		res = {
			success: false,
			message: "未创建商铺"
		}
	}

	return res;
}
