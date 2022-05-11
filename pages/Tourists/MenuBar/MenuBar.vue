<template>
	<view>
		<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import navList from '@/pages/Tourists/utils/navList';
	export default {
		setup() {
			const list = reactive(navList)
			const current = ref(0);
			return {
				list,
				current
			}
		}

	}
</script>

<style>

</style>
