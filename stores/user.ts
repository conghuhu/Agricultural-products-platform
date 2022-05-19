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
	function updateUserInfo(info) {
		Object.assign(userInfo, info);
	}


	// 喜欢种草的集合
	const likeShareSet: Set<string> = reactive(new Set());
	function addToLikeShareSet(shareId: string) {
		likeShareSet.add(shareId);
	}
	function removeFromLikeShareSet(shareId: string) {
		likeShareSet.delete(shareId);
	}

	return { userInfo, updateUserInfo, likeShareSet, addToLikeShareSet, removeFromLikeShareSet };
});