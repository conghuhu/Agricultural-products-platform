import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const merchantStore = defineStore('merchant', () => {

	const shopInfo = reactive({
		createTime: "",
		description: "",
		focus: 0,
		phone: "",
		shopName: "",
		star: 0,
		username: "",
		_id: "",
		shopAvatar: '',
		totalSale: 0
	});

	function initShopInfo(info) {
		Object.assign(shopInfo, info);
	}

	return {
		shopInfo,
		initShopInfo
	};
});