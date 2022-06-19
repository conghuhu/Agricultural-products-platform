<template>
	<view class="goodCard" @click="goToDetail(item)">
		<block v-if="item.imageShowList != null && item.imageShowList.length > 0">
			<u-lazy-load threshold="-100" imgMode="widthFix" border-radius="16" :image="item.imageShowList[0]"
				:index="item._id" />
			<view class="goodCard_bottom">
				<view class="goodTitle">
					{{item.goodName}}
				</view>
				<view class="goodDetail">
					<view>
						单价：{{item.goodPrice}}
					</view>
					<view>
						已售：0
					</view>
					<view>
						评论：0
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script lang="ts">
	export default {
		props: {
			// 检测类型
			item: {
				type: Object,
				default: () => ({}),
				required: true,
			},
			isShop: {
				type: Boolean,
				default: true
			}
		},
		setup(props) {
			const goToDetail = async (item) => {
				if (props.isShop) {
					uni.navigateTo({
						url: `/pages/Merchants/GoodDetail/GoodDetail?goodId=${item._id}`
					})
				} else {
					const goodId = item._id;
					uni.navigateTo({
						url: `/pages/Tourists/GoodDetail/GoodDetail?goodId=${goodId}`
					})
				}
			}
			return {
				goToDetail
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodCard {
		position: relative;
		margin: 20rpx;

		.goodCard_bottom {
			position: absolute;
			bottom: 10rpx;
			display: flex;
			flex-direction: column;
			color: white;
			padding: 20rpx;
			width: 100%;
			font-size: 24rpx;

			.goodTitle {
				font-size: 38rpx;
				font-weight: 600;
				width: 100%;
				margin-bottom: 20rpx;
				text-shadow: 0px 3px 6px #382B2B;
			}

			.goodDetail {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 100%;
			}
		}
	}
</style>
