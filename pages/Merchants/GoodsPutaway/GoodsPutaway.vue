<template>
	<view>
		<Nav title="商品上架" :isBack="true" />
		<u-form :model="form" ref="formRef">
			
		</u-form>
	</view>
</template>

<script lang="ts">
	import {
		ref,
		reactive
	} from 'vue';

	export default {
		setup() {
			const form = reactive({
				goodName: '',
				goodPrice: NaN,
				unit: '',
				imageShowList: [],
				imageIntroductionList: [],
				originPlace: '',
				specification: '',
				expirationDate: null,
				mode:''
			});
			let formRef = ref(null);
			return {
				form,
				formRef
			}
		}
	}
</script>

<style>

</style>
