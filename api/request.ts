const request = (funcName: string, param: any) => {
	return wx.cloud.callFunction({
		name: funcName,
		data: param
	}).then((res)=>{
		return res.result;
	}).catch(err => {
		console.trace(err);
		return null;
	});
};

export default request;