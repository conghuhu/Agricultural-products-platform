
const list = [{
	iconPath: "home",
	selectedIconPath: "home-fill",
	text: '店铺',
	count: 2,
	isDot: true,
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/Shop/Shop",
},
{
	iconPath: "photo",
	selectedIconPath: "photo-fill",
	text: '学习',
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/LearnCenter/LearnCenter"
},
{
	iconPath: "plus-circle",
	selectedIconPath: "plus-circle-fill",
	text: '上架',
	midButton: true,
	customIcon: false,
	custom: true,
	// 跳转此页面，是否是navigator跳转，前提必须custom为true
	navigator: true,
	pagePath: "/pages/Merchants/GoodsPutaway/GoodsPutaway"
},
{
	iconPath: "shopping-cart",
	selectedIconPath: "shopping-cart-fill",
	text: '订单',
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/OrderCenter/OrderCenter"
},
{
	iconPath: "account",
	selectedIconPath: "account-fill",
	text: '我的',
	count: 23,
	isDot: false,
	customIcon: false,
	custom: true,
	pagePath: "/pages/Merchants/PersonCenter/PersonCenter"
},
];

export default list;