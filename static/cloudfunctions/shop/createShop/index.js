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

	if (isAbsent.data.length == 0) {
		const content = await shopDb.add({
			data: {
				_openid: openId,
				createTime: new Date(),
				star: 4,
				focus: 0,
				username,
				phone,
				shopName,
				description,
				shopAvatar
			}
		});
		log.info({
			name: 'createShop',
			message: ``,
			res: content,
			data: createShopForm
		})
		res = {
			success: true,
			message: "创建成功",
			data: content
		}
	} else {
		res = {
			success: false,
			message: "不可重复申请"
		}
	}

	return res;
}
