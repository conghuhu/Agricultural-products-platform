import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const userStore = defineStore('user', () => {
	const likeShareSet: Set<string> = reactive(new Set());
	function addToLikeShareSet(shareId: string) {
		likeShareSet.add(shareId);
	}
	function removeFromLikeShareSet(shareId: string) {
		likeShareSet.delete(shareId);
	}

	return { likeShareSet, addToLikeShareSet, removeFromLikeShareSet };
});