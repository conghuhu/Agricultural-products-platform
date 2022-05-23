import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const userStore = defineStore('user', () => {
	// 用户基本信息
	const userInfo = reactive({
		avatarUrl: "",
		city: "",
		gender: NaN,
		lastLoginTime: "",
		nickName: "",
		registerTime: "",
		status: NaN,
		_openid: ""
	});
	// 喜欢种草的集合
	const likeShareSet: Set<string> = reactive(new Set());
	// 用户当前所选的收货位置
	const currentLocationVal = ref('请选择收货位置');
	const location = reactive({
		latitude: 36.628296,
		longitude: 117.060097
	})
	/**
	 * 更新用户的地理信息
	 */
	function updateLocationInfo(currentLocation: string, latitude?: number, longitude?: number) {
		currentLocationVal.value = currentLocation;
		if (latitude && longitude) {
			location.latitude = latitude;
			location.longitude = longitude;
		}
	};
	function updateUserInfo(info) {
		Object.assign(userInfo, info);
	};
	function addToLikeShareSet(shareId: string) {
		likeShareSet.add(shareId);
	};
	function removeFromLikeShareSet(shareId: string) {
		likeShareSet.delete(shareId);
	};

	return { userInfo, updateUserInfo, currentLocationVal, location, updateLocationInfo, likeShareSet, addToLikeShareSet, removeFromLikeShareSet };
});