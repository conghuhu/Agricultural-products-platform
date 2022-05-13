// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    ID
  } = event;

  const userDb = db.collection('address');
  const _ = db.command

  let res = {};
  if(ID!=null){
	  res = await userDb.where({
		  _id:_.eq(ID)
	  }).remove()
  }
  
  return {
	res
  };
}