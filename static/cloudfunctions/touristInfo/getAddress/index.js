// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  const userDb = db.collection('address');
  const _ = db.command
  const isAbsent = await userDb.where({
  	_openid: _.eq(wxContext.OPENID)
  }).get();
  let res = isAbsent.data;
  console.log(11111)
  console.log(res)
  return {
	res
  };
}