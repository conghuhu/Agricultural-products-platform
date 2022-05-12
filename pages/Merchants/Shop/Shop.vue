<template>
	<view>
		<Nav title="我的店铺" />
		<u-tabbar v-model="current" :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	export default {
		setup() {
			const list = reactive(navList);
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
