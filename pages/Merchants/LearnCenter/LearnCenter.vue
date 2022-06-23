<template>
	<view>
		<Nav title="科学助农" />
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

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		font-size: 32rpx;
		width: 100%;
		background-color: $background-color;

		.content {
			position: relative;
			background-color: $background-color;
		}
	}
</style>
