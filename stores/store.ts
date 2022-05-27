import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const commonStore = defineStore('store', () => {
	// 当前的种类
	const currentCategory = ref(0);
	const updateCurCategory = (newVal: number) => {
		currentCategory.value = newVal;
	};
	
	

	return { currentCategory, updateCurCategory };
});