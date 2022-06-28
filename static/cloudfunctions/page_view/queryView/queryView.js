// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const dayjs = require("dayjs");
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	
	const viewDb = db.collection('page_view');
	const _ = db.command;
    const $ = db.command.aggregate;
	
	const {
		goodId
	} = event;

	const ttt=dayjs(new Date()).format('YYYY-MM-DD');

	try {
		const queryViews = await viewDb
		  .aggregate()
		  .match({
		    goodId: goodId
		  })
		  .group({
		    _id: '$newTime',
		    count: $.sum(1)
		  })
		  .end()
		  console.log(queryViews);
		  let weekViewDate=[0,0,0,0,0,0,0];
		  let weekViewDate1=[[null,0],[null,0],[null,0],[null,0],[null,0],[null,0],[null,0]];
		  for (let j = 0; j < 7; j++) {
			  const t1 = new Date().getTime();
			  const t2 = (j+1)*86400000;
			  const t3 = new Date(t1-t2);
			  const t4=dayjs(t3).format('YYYY-MM-DD');
			  weekViewDate1[6-j][0]=t4;

		  }
		  
		  for (let i = 0; i < queryViews.list.length; i++) {
			  const d=queryViews.list[i]._id;
			  const diff = dayjs(ttt).diff(dayjs(d));
			  if(diff==86400000){
				weekViewDate1[6][1]=queryViews.list[i].count;
			  }
			  if(diff==172800000){
			  	weekViewDate1[5][1]=queryViews.list[i].count;
			  }
			  if(diff==259200000){
			  	weekViewDate1[4][1]=queryViews.list[i].count;
			  }
			  if(diff==345600000){
			  	weekViewDate1[3][1]=queryViews.list[i].count;
			  }
			  if(diff==432000000){
			  	weekViewDate1[2][1]=queryViews.list[i].count;
			  }
			  if(diff==518400000){
			  	weekViewDate1[1][1]=queryViews.list[i].count;
			  }
			  if(diff==604800000){
			  	weekViewDate1[0][1]=queryViews.list[i].count;
			  }
		  }
		  console.log(weekViewDate1);
		res = {
			sucess: true,
			message: "",
			data: weekViewDate1
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
