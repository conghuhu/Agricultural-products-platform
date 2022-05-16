const isCloudImg = (url: string) => {
	const left = url.slice(0, 5);
	return left == "cloud";
}

export default isCloudImg;
