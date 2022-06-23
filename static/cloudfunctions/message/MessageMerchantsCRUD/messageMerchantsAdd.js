// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();


	const _ = db.command;

	const {
		messageData
	} = event;

	let res = {};
	try {
		const messageDb = db.collection('chat-msgs');
		const userDb = db.collection("users")
		const m_openId = wxContext.OPENID;
		const resTemp = await userDb.where({
			_openid: _.eq(m_openId)
		}).get()
		const m_userInfo = {
			avatarUrl: resTemp.data[0].avatarUrl,
			nickName: resTemp.data[0].nickName
		}
		const userInfo = await userDb.where({
			_openid: _.eq(messageData.openId)
		}).get()
		const o_userInfo = {
			avatarUrl: userInfo.data[0].avatarUrl,
			nickName: userInfo.data[0].nickName
		}
		console.log(o_userInfo)
		console.log(m_userInfo)

		const temp = await messageDb.add({
			data: {
				openId: messageData.openId,
				m_openId: m_openId,
				msgType: messageData.msgType,
				content: messageData.content,
				o_userInfo: o_userInfo,
				m_userInfo: m_userInfo,
				_createTime: new Date(),
				t_read:"0",
				m_read:"1",
				to:"mTOt"
			}
		})
		res = {
			sucess: true,
			message: "",
			data: temp
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
