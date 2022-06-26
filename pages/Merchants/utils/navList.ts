
const list = [{
	iconPath: "/static/images/shop.png",
	selectedIconPath: "/static/images/shop_fill.png",
	text: '店铺',
	isDot: true,
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/Shop/Shop",
},
{
	iconPath: "/static/images/learn.png",
	selectedIconPath: "/static/images/learn_fill.png",
	text: '助农',
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/LearnCenter/LearnCenter"
},
{
	iconPath: "/static/images/upload.png",
	selectedIconPath: "/static/images/upload.png",
	text: '上架',
	midButton: true,
	customIcon: false,
	custom: true,
	// 跳转此页面，是否是navigator跳转，前提必须custom为true
	navigator: true,
	pagePath: "/pages/Merchants/GoodsPutaway/GoodsPutaway"
},
{
	iconPath: "/static/images/order.png",
	selectedIconPath: "/static/images/order_fill.png",
	text: '订单',
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/OrderCenter/OrderCenter"
},
{
	iconPath: "/static/images/me.png",
	selectedIconPath: "/static/images/me_fill.png",
	text: '我的',
	count: 23,
	isDot: false,
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/PersonCenter/PersonCenter"
},
];

export default list;