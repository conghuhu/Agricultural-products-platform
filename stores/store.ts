import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const commonStore = defineStore('store', () => {
	// 当前的种类
	const currentCategory = ref(0);
	const updateCurCategory = (newVal: number) => {
		currentCategory.value = newVal;
	};

	const curSubmitOrderList = reactive<any[]>([]);
	const clearCurSumbitOrderList = () => {
		curSubmitOrderList.length = 0;
	};
	const addCurSumbitOrderList = (target: any[]) => {
		console.log(target);
		target.forEach(item => {
			curSubmitOrderList.push(item);
		});
	};

	const mNoRead = ref(false);
	const updatemNoRead = (value: boolean) => {
		mNoRead.value = value;
	}

	const tNoRead = ref(false);
	const updatetNoRead = (value: boolean) => {
		tNoRead.value = value;
	}


	return { currentCategory, updateCurCategory, curSubmitOrderList, clearCurSumbitOrderList, addCurSumbitOrderList,
	 mNoRead,updatemNoRead,tNoRead,updatetNoRead};
});