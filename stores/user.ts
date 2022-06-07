import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import navList from '@/pages/Tourists/utils/navList';

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
	// 加入购物车的商品 k:goodId v:count
	const wantingGoods: Map<string, number> = reactive(new Map());
	const totalCount: number = ref(0);

	// 用户当前所选的收货位置
	const currentLocationVal = ref('请选择收货位置');
	// 用户当前所选的收货位置地理坐标
	const location = reactive({
		latitude: 36.628296,
		longitude: 117.060097
	});
	// 用户当前所选的收货地址的id
	const curLocationId = ref('');

	function setTotalWantedGoods(count: number) {
		navList[3].count = count;
		totalCount.value = count;
	}

	/**
	 * 想要的商品至菜篮子+1
	 */
	function incrementWantedGood(goodId: string) {
		if (wantingGoods.has(goodId)) {
			wantingGoods.set(goodId, wantingGoods.get(goodId) + 1);
		} else {
			wantingGoods.set(goodId, 1);
		};
		totalCount.value++;
		navList[3].count = totalCount.value;
	};
	/**
	 * 自减某个想要的商品
	 */
	function decrementWantedGood(goodId: string) {
		if (!wantingGoods.has(goodId)) {
			return;
		}
		const res = wantingGoods.get(goodId);
		if (res == 1) {
			wantingGoods.delete(goodId);
		} else {
			wantingGoods.set(goodId, res - 1);
		}
		totalCount.value--;
		navList[3].count = totalCount.value;
	}
	/**
	 * 移除某项想要的商品
	 */
	function removeWantedGood(goodIdList: string[]) {
		goodIdList.forEach(goodId => {
			if (!wantingGoods.has(goodId)) {
				return;
			}
			const res = wantingGoods.get(goodId);
			wantingGoods.delete(goodId);
			totalCount.value -= res;
			navList[3].count = totalCount.value;
		});
	}
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
	/**
	 * 更新locationId
	 */
	function updateLocationId(id: string) {
		curLocationId.value = id;
	}

	function updateUserInfo(info) {
		Object.assign(userInfo, info);
	};
	function addToLikeShareSet(shareId: string) {
		likeShareSet.add(shareId);
	};
	function removeFromLikeShareSet(shareId: string) {
		likeShareSet.delete(shareId);
	};

	return {
		userInfo, updateUserInfo, wantingGoods,
		currentLocationVal, location, updateLocationInfo,
		incrementWantedGood, decrementWantedGood,
		likeShareSet, addToLikeShareSet, removeFromLikeShareSet,
		setTotalWantedGoods, totalCount,
		curLocationId, updateLocationId,
		removeWantedGood
	};
});