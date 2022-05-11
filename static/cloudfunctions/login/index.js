const merChantLogin = require('./merChantLogin/index')
const touristLogin = require('./touristLogin/index')

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'merChantLogin':
			return await merChantLogin.main(event, context);
		case 'touristLogin':
			return await touristLogin.main(event, context);
	}
}
