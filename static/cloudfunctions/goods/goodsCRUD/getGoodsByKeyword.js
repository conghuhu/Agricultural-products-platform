// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 根据keyword获取商品
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();

	const {
		keyword, //搜索关键字
		orderType, // 排序方式 price升序 销量降序
		categoryIdList,
		priceRange,
		latitude,
		longitude
	} = event;
	let res = {};

	try {
		const goodDb = db.collection('goods');
		const _ = db.command;

		const log = cloud.logger();

		log.info({
			name: 'getGoodsByKeyword',
			message: '前端传值为',
			keyword, //搜索关键字
			orderType, // 排序方式 price升序 销量降序
			categoryIdList,
			priceRange,
		})

		let temp;

		// 1. 没有附加的筛选条件
		if (categoryIdList.length == 0 && priceRange[0] == null) {
			temp = await goodDb.where(_.or([{
						goodName: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					},
					{
						description: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					}
				]))
				.orderBy(orderType == "price" ? 'goodPrice' : 'sale', orderType == "price" ? 'asc' : 'desc')
				.get();
		} else if (categoryIdList.length != 0 && priceRange[0] == null) {
			// 2. 只有分类筛选
			temp = await goodDb.where(_.and([{
					firstCategoryId: _.in(categoryIdList)
				}, _.or([{
						goodName: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					},
					{
						description: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					}
				])]))
				.orderBy(orderType == "price" ? 'goodPrice' : 'sale', orderType == "price" ? 'asc' : 'desc')
				.get();
		} else if (categoryIdList.length == 0 && priceRange[0] != null) {
			// 3. 只有价格筛选
			temp = await goodDb.where(_.and([{
					goodPrice: _.and(_.gt(priceRange[0]), _.lt(priceRange[1]))
				}, _.or([{
						goodName: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					},
					{
						description: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					}
				])]))
				.orderBy(orderType == "price" ? 'goodPrice' : 'sale', orderType == "price" ? 'asc' : 'desc')
				.get();
		} else if (categoryIdList.length != 0 && priceRange[0] != null) {
			// 4. 有价格，有种类筛选
			temp = await goodDb.where(_.and([{
					goodPrice: _.and(_.gt(priceRange[0]), _.lt(priceRange[1]))
				}, {
					firstCategoryId: _.in(categoryIdList)
				}, _.or([{
						goodName: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					},
					{
						description: db.RegExp({
							//从搜索栏中获取的value作为规则进行匹配。
							regexp: keyword,
							//大小写不区分
							options: 'i',
						})
					}
				])]))
				.orderBy(orderType == "price" ? 'goodPrice' : 'sale', orderType == "price" ? 'asc' : 'desc')
				.get();
		}

		res = {
			sucess: true,
			message: "",
			data: temp.data || null
		}
	} catch (e) {
		//TODO handle the exception
		console.trace(e);
		res = {
			sucess: false,
			message: "获取商品列表失败",
			data: null
		}
	}

	return res;
}
