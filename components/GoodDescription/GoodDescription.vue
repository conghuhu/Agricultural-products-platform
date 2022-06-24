<template>
	<view class="form">
		<view class="item">
			<view class="label">
				第一类别
			</view>
			<view class="value">
				{{goodInfo.firstCategoryName}}
			</view>
		</view>

		<view class="item">
			<view class="label">
				第二类别
			</view>
			<view class="value">
				{{goodInfo.secondCategoryName}}
			</view>
		</view>

		<view class="item">
			<view class="label">
				规格
			</view>
			<view class="value">
				{{goodInfo.specification}}
			</view>
		</view>

		<view class="item">
			<view class="label">
				保质期
			</view>
			<view class="value">
				{{goodInfo.expirationDate}}
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		props: {
			goodInfo: {
				type: Object,
				default: () => {},
				required: false,
			},
		},
		setup() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		font-size: 30rpx;
		line-height: 60rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;

		.item {
			width: 100%;
			display: flex;
			align-items: center;

			.label {
				width: 200rpx;
			}

			.value {
				color: $u-content-color;
			}
		}
	}
</style>
