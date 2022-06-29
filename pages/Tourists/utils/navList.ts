import { reactive } from 'vue';

const list = reactive([{
	iconPath: "/static/images/home.png",
	selectedIconPath: "/static/images/home_fill.png",
	text: '首页',
	customIcon: false,
	pagePath: "/pages/Tourists/HomeBar/HomeBar",
},
{
	iconPath: "/static/images/fenlei.png",
	selectedIconPath: "/static/images/fenlei_fill.png",
	text: '分类',
	customIcon: false,
	pagePath: "/pages/Tourists/ClassificationBar/ClassificationBar"
},
{
	iconPath: "/static/images/seeding.png",
	selectedIconPath: "/static/images/seeding.png",
	text: '种草',
	midButton: true,
	customIcon: false,
	pagePath: "/pages/Tourists/MenuBar/MenuBar"
},
{
	iconPath: "/static/images/gouwuche.png",
	selectedIconPath: "/static/images/gouwuche_fill.png",
	text: '菜篮子',
	customIcon: false,
	count: 0,
	pagePath: "/pages/Tourists/ShoppingBar/ShoppingBar"
},
{
	iconPath: "/static/images/MeBar.png",
	selectedIconPath: "/static/images/MeBar_fill.png",
	text: '我的',
	isDot: false,
	customIcon: false,
	count: 0,
	pagePath: "/pages/Tourists/MeBar/MeBar"
},
]);
export default list;