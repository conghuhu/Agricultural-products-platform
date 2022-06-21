<template>
	<view class="fullScreen">
		<Nav :title="title" :isBack="true"></Nav>
		<view class="content">
			<view style="margin-bottom: 16rpx;">
				<u-tabs activeColor="#4CC818" :showBar="false" :list="tabList" :is-scroll="false" v-model="current"
					@change="changeTab" :clickChange="true" />
			</view>

			<GoodList :flowList="goodList" :goodListLoading="goodListLoading" />
		</view>
		<u-popup v-model="show" mode="right" width="600rpx">
			<view class="pop_content">
				<view class="card">
					<text class="title">分类</text>
					<view class="category_body">
						<view style="margin-bottom: 26rpx;margin-right: 26rpx;"
							v-for="(item,index) in firstCategoryList" :key="item._id">
							<u-button @click="selectCategory(index)" :custom-style="customStyle" size="medium"
								:type="item.checked ? 'success':'info'">
								{{item.name}}
							</u-button>
						</view>
					</view>
				</view>

				<view class="card">
					<text class="title">价格区间</text>
					<view class="price">
						<u-input v-model="priceRange[0]" type="number" :border="true" placeholder="最低价" />
						<view class="line">
							—
						</view>
						<u-input v-model="priceRange[1]" type="number" :border="true" placeholder="最高价" />
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<u-button type="info" @click="reset">重置</u-button>
					</view>
					<view class="right">
						<u-button type="primary" @click="search">确定</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';
	import request from '@/api/request';
	export default {
		setup() {
			const keyword = ref("");
			const keywords = reactive([]);
			const goodList = reactive([]);
			const goodListLoading = ref(true);
			const title = ref('查询结果');
			const show = ref(false);

			// 第一类别
			const firstCategoryList = reactive([]);
			// 价格区间
			const priceRange = reactive([NaN, NaN]);

			const tabList = reactive([{
				name: '价格'
			}, {
				name: '销量'
			}, {
				name: '筛选'
			}]);
			/**
			 * 当前tab坐标
			 */
			const current = ref(0);

			const customStyle = ref({
				width: '100rpx'
			})

			/**
			 * 切换tab
			 */
			const changeTab = (index) => {
				console.log(index);
				if (index == 0) {
					initData();
				} else if (index == 2) {
					show.value = true;
				}
			}

			const selectCategory = (index) => {
				firstCategoryList[index].checked = !firstCategoryList[index].checked;
			};

			/**
			 * 初始化数据
			 */
			const initData = async (categoryIdList ? : string[], priceRange ? : number[]) => {

				goodListLoading.value = true;

				const {
					data: list
				} = await request('goods', {
					type: 'getGoodsByKeyword',
					keyword: keyword.value,
					orderType: 'price',
					categoryIdList: categoryIdList || [],
					priceRange: priceRange ? priceRange.map(item => Number(item)) : [NaN, NaN]
				})
				if (list) {
					goodList.length = 0;
					list.forEach(item => {
						goodList.push(item);
					});
				}

				goodListLoading.value = false;
			}

			/**
			 * 重置筛选条件
			 */
			const reset = () => {
				firstCategoryList.forEach(item => {
					item.checked = false;
				});
				priceRange[0] = NaN;
				priceRange[1] = NaN;
			}

			const search = () => {
				if ((isNanOrNull(priceRange[0]) && !isNanOrNull(priceRange[1])) || (!isNanOrNull(priceRange[0]) &&
						isNanOrNull(priceRange[
							1]))) {
					uni.showToast({
						icon: 'error',
						title: '区间要完整'
					})
					return;
				} else if (priceRange[0] > priceRange[1]) {
					uni.showToast({
						icon: 'error',
						title: '最低要小于最高'
					})
					return;
				} else if (priceRange[0] < 0 || priceRange[1] < 0) {
					uni.showToast({
						icon: 'error',
						title: '价格要大于0'
					})
					return;
				}
				const categoryIdList = firstCategoryList.filter(item => item.checked).map(item => item._id);

				initData(categoryIdList, priceRange.map(item => {
					if (isNanOrNull(item)) {
						return NaN
					} else {
						return item
					}
				}));
				show.value = false;
			}

			/**
			 * 判断元素是否为null Nan ""
			 */
			const isNanOrNull = (e) => {
				return isNaN(e) || e == null || e == "";
			}

			return {
				keywords,
				goodList,
				goodListLoading,
				title,
				tabList,
				current,
				changeTab,
				keyword,
				initData,
				show,
				firstCategoryList,
				selectCategory,
				priceRange,
				customStyle,
				reset,
				search
			}
		},
		async onLoad(option) {
			this.title = option.keyword;
			this.keywords.length = 0;
			try {
				const res = await wx.serviceMarket.invokeService({
					service: 'wxcae50ba710ca29d3', // 'wx_mp_appid',
					api: 'goodinfo',
					data: {
						"q": option.keyword, //需要进行商品关键词识别的语句
					},
				});

				const preprocessed_text = res.data.preprocessed_text;

				console.log('调用nlp接口成功', res)
				if (res.data.entities.product) {
					res.data.entities.product.forEach(item => {
						this.keywords.push([item[0], item[1]]);
					});
				} else {
					this.keywords.push([option.keyword, 'name']);
				}

				for (let i = 0; i < this.keywords.length; i++) {
					const item = this.keywords[i];
					if (item[1] == "name") {
						this.keyword = item[0];
						break;
					}
				}

				// 如果nlp接口无值，直接取用户输入的东西
				if (this.keyword == '' || this.keyword == null) {
					this.keyword = preprocessed_text;
				}

				await this.initData();

				request('recommend', {
					type: 'addHotWord',
					keyword: this.keyword,
				});

			} catch (e) {
				console.trace(e);
			}


			const categoryRes = await request('goods', {
				type: 'getFirstCategory'
			});
			this.firstCategoryList.length = 0;
			categoryRes.data.forEach(item => {
				this.firstCategoryList.push({
					...item,
					checked: false
				});
			});
			console.log(categoryRes);

		}
	}
</script>

<style lang="scss" scoped>
	.fullScreen {
		height: 100vh;
		width: 100%;
		background-color: $background-color;
		position: relative;
		font-size: 32rpx;

		.content {
			background-color: $background-color;
		}

		.pop_content {
			padding: 20rpx;
			padding-top: 140rpx;
			position: relative;
			height: 100%;

			.card {

				.title {
					margin-top: 20rpx;
					font-weight: 550;
				}

				.category_body {
					margin-top: 26rpx;
					display: flex;
					flex-wrap: wrap;
				}

				.price {
					display: flex;
					align-items: center;
					margin-top: 26rpx;

					.line {
						margin-left: 16rpx;
						margin-right: 16rpx;
						color: $u-type-info-dark;
					}
				}
			}

			.bottom {
				position: absolute;
				bottom: 30rpx;
				width: 100%;
				display: flex;
				align-items: center;
				padding-right: 40rpx;

				.left {
					flex: 1;
					margin-right: 10rpx;
				}

				.right {
					flex: 1;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
