<template>
	<Nav title="种草"></Nav>
	<view>
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
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
			return {
				list,
			}
		}

	}
</script>

<style>

</style>
