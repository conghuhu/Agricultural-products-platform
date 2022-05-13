// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    form
  } = event;

  const userDb = db.collection('address');
  const _ = db.command

  let res = {};
  if(form._id!=""){
	  res = await userDb.where({
		  _id:_.eq(form._id)
	  }).update({
		  data:{
			  _openid:wxContext.OPENID,
			  adress:form.adress,
			  house:form.house,
			  consignee:form.consignee,
			  sex:form.sex,
			  phone:form.phone,
			  location:form.location
		  }
	  })
  }else{
	  res = await userDb.add({
	  	  data:{
	  		  _openid:wxContext.OPENID,
	  		  adress:form.adress,
	  		  house:form.house,
	  		  consignee:form.consignee,
	  		  sex:form.sex,
	  		  phone:form.phone,
	  		  location:form.location
	  	  }
	  })
  }
  
  return {
	res
  };
}