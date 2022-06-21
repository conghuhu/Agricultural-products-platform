<template>
	<view class="star_group" @click.stop="clickStar">
		<image v-if="isStar" style="width: 42rpx;height: 42rpx;" src="/static/images/star.png" mode="aspectFit" />
		<image v-else style="width: 42rpx;height: 42rpx;" src="/static/images/star_none.png" mode="aspectFit" />

		<view class="star_count">
			{{starCount}}
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive,
		onMounted,
		toRefs,
		computed
	} from 'vue';
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	export default {
		props: {
			// 检测类型
			shareId: {
				type: String,
				default: '',
				required: true,
			},
			star: {
				type: Number,
				default: 0,
				required: true
			}
		},
		emits: ['increment', 'decrement'],
		setup(props, context) {
			const user = userStore();
			const {
				shareId: id,
				star: starCount
			} = toRefs(props);

			const isStar = computed(() => {
				return user.likeShareSet.has(id.value);
			})

			const clickStar = async () => {
				if (!isStar.value) {
					context.emit('increment');
					user.addToLikeShareSet(id.value);
					// 点赞
					const res = await request('star_focus', {
						type: 'addStar',
						shareId: id.value
					})
				} else {
					context.emit('decrement');
					user.removeFromLikeShareSet(id.value);
					// 取消点赞
					const res = await request('star_focus', {
						type: 'removeStar',
						shareId: id.value
					})
				}
			};
			onMounted(() => {});
			return {
				isStar,
				clickStar,
				starCount
			}
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.star_group {
		display: flex;
		justify-content: center;
		align-items: center;

		.star_count {
			font-size: 28rpx;
			margin-left: 10rpx;
			color: #949397;
		}
	}
</style>
