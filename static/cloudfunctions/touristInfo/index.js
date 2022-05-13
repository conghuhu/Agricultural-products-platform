const getAddress = require('./getAddress/index');
const submitAdress = require('./submitAdress/index')
const delAddress = require('./delAddress/index')

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.type) {
		case 'getAddress':
			return await getAddress.main(event, context);
		case 'submitAdress':
			return await submitAdress.main(event, context);
		case'delAddress':
		    return await delAddress.main(event, context);
	}
}
