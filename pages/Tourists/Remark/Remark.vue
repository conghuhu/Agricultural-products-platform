<template>
	<view class="fullScreen">
		<Nav title="填写备注" isBack />
		<view class="content">
			<u-input v-model="value" type="textarea" :border="true" :height="250" :auto-height="true" :maxlength="50"
				placeholder="请填写备注,最多50个字" />
			<view style="margin-top: 50rpx;">
				<u-button @click="goBack" shape="circle" type="primary">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue';
	export default {
		setup() {
			const eventChannel = reactive({});
			const value = ref('');
			const goBack = ()=>{
				eventChannel.emit('changeRemarkVal',value.value);
				uni.navigateBack();
			};
			return {
				value,
				eventChannel,
				goBack
			}
		},
		onLoad(option) {
			console.log(option);
			Object.assign(this.eventChannel, this.getOpenerEventChannel());
			this.value = option.remarkVal;
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
			padding: 20rpx;
			padding-bottom: 100rpx;
		}
	}
</style>
