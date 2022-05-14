<template>
	<view class="goodCard">
		<block v-if="item.imageShowList != null && item.imageShowList.length > 0">
			<u-lazy-load threshold="-100" imgMode="widthFix" border-radius="20" :image="item.imageShowList[0]"
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
				default: {},
				required: true,
			},
		},
		setup() {

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
