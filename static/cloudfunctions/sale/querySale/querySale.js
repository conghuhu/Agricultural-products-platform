// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	
	const goodDb = db.collection('sales');
	const _ = db.command;
    const $ = db.command.aggregate;
	
	const {
		goodId
	} = event;
 //    const newTime=dayjs(createTime).format('YYYY-MM-DD');
	// const date = new Date(newTime);
	// const nowTime = date.getTime();
	// const date1 = dayjs('2019-01-25');
	// const date2 = dayjs('2019-01-24');
	const ttt=dayjs(new Date()).format('YYYY-MM-DD');
	// console.log(dayjs(new Date()).format('YYYY-MM-DD'));
	// console.log(date1.diff(date2));// 20214000000 default milliseconds
 //    console.log(nowTime);
 //    console.log(date);
	// console.log(newTime);
 //    console.log(goodId);
	// console.log(goodNums);
	try {
		const querySales = await goodDb
		  .aggregate()
		  .match({
		    goodId: goodId
		  })
		  .group({
		    _id: '$newTime',
		    totalNum: $.sum('$goodNums')
		  })
		  .end()
		  let weekSaleDate=[0,0,0,0,0,0,0];
		  let weekSaleDate1=[[null,0],[null,0],[null,0],[null,0],[null,0],[null,0],[null,0]];
		  for (let j = 0; j < 7; j++) {
			  const t1 = new Date().getTime();
			  const t2 = (j+1)*86400000;
			  const t3 = new Date(t1-t2);
			  // const t4=t3.getFullYear();
			  const t4=dayjs(t3).format('YYYY-MM-DD');
			  weekSaleDate1[6-j][0]=t4;
			  console.log(j);
			  console.log(t1);
			  console.log(t2);
			  console.log(t3);
			  console.log(t4);
		  }
		  
		  for (let i = 0; i < querySales.list.length; i++) {
			  const d=querySales.list[i]._id;
			  const diff = dayjs(ttt).diff(dayjs(d));
			  console.log(d);
			  console.log(ttt);
			  console.log(diff);
			  if(diff==86400000){
				weekSaleDate1[6][1]=querySales.list[i].totalNum;
			  }
			  if(diff==172800000){
			  	weekSaleDate1[5][1]=querySales.list[i].totalNum;
			  }
			  if(diff==259200000){
			  	weekSaleDate1[4][1]=querySales.list[i].totalNum;
			  }
			  if(diff==345600000){
			  	weekSaleDate1[3][1]=querySales.list[i].totalNum;
			  }
			  if(diff==432000000){
			  	weekSaleDate1[2][1]=querySales.list[i].totalNum;
			  }
			  if(diff==518400000){
			  	weekSaleDate1[1][1]=querySales.list[i].totalNum;
			  }
			  if(diff==604800000){
			  	weekSaleDate1[0][1]=querySales.list[i].totalNum;
			  }
		  }
		  console.log(weekSaleDate1);
		res = {
			sucess: true,
			message: "",
			data: weekSaleDate1
		}
	} catch (e) {
		console.trace(e);
		res = {
			sucess: false,
			message: "未知异常",
			data: e
		}
	}
	return res;
}
