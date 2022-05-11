// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    userInfo,
	status
  } = event;

  const userDb = db.collection('users');
  const _ = db.command
  const isAbsent = await userDb.where({
    _openid: _.eq(wxContext.OPENID)
  }).get();

  let res = {};
  if (isAbsent.data.length == 0) {
    console.log(wxContext.OPENID + userInfo.nickName + "商家初次登录");
    res = await userDb.add({
      data: {
        _openid: wxContext.OPENID,
        nickName: userInfo.nickName,
		status: status,
        avatarUrl: userInfo.avatarUrl,
        city: userInfo.city,
        language: userInfo.language,
        gender: userInfo.gender,
        registerTime: new Date(),
        lastLoginTime: new Date()
      }
    })
  } else {
    console.log(wxContext.OPENID + userInfo.nickName + "商家再次登录")
    res = await userDb.doc(isAbsent.data[0]._id).update({
      data: {
        lastLoginTime: new Date()
      }
    })
  }
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
}