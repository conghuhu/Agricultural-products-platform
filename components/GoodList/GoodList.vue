<template>
	<view class="wrap">
		<MyLoading v-if="goodListLoading" />
		<view style="width: 100%;" v-else>
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<GoodShowCard v-for="item in leftList" :key="item._id" :item="item" />
				</template>
				<template v-slot:right="{rightList}">
					<GoodShowCard v-for="item in rightList" :key="item._id" :item="item" />
				</template>
			</u-waterfall>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		computed,
		nextTick
	} from 'vue';
	export default {
		props: {
			// 检测类型
			flowList: {
				type: Array,
				default: () => [],
				required: true,
			},
			goodListLoading: {
				type: Boolean,
				default: true,
				required: true
			}
		},
		setup() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20rpx;
		padding-top: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
