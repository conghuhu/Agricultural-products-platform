<template>
	<view class="fullScreen">
		<Nav title="我的店铺" />
		<view class="content" v-if="isNew">
			<u-empty text="还没有个人商铺" mode="list">
				<template #bottom>
					<u-button :customStyle="buttonStyle" type="primary" @click="createShop">去创建</u-button>
				</template>
			</u-empty>
			<u-modal title="创建商铺" v-model="createShopShow" confirm-text="创建" cancel-text="去了解我们平台"
				:show-cancel-button="true">
				<view class="slot-content">
					<view>
						5551
					</view>
				</view>
			</u-modal>
		</view>
		<view class="content" v-else>

		</view>
		<u-tabbar :list="list" :mid-button="true" :hideTabBar="false"></u-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import navList from '@/pages/Merchants/utils/navList';
	import request from '@/api/request';
	export default {
		setup() {
			const list = reactive(navList);
			const isNew = ref(true);
			const createShopShow = ref(false);

			const buttonStyle = reactive({
				margin: '15px'
			});

			/**
			 * 创建个人商铺
			 */
			const createShop = async () => {
				createShopShow.value = true;
			}

			return {
				list,
				isNew,
				createShop,
				buttonStyle,
				createShopShow
			}
		},
		async onLoad() {
			const res: {
				res: Boolean
			} = await request("shop", {
				type: "checkCreatedShop"
			});
			this.isNew = !res.res;
		},
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;

		.content {
			height: calc(100vh - 145px);
		}
	}
</style>
