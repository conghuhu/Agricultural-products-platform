<script lang="ts">
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
	import navList from '@/pages/Tourists/utils/navList';
	export default {
		setup() {
			const user = userStore();
			return {
				user
			}
		},
		async onLaunch() {
			wx.cloud.init({
				// env 参数说明：
				//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
				//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
				//   如不填则使用默认环境（第一个创建的环境）    
				//env: '你的环境ID',
				env: 'cloud1-7giqepei42865a68',
				traceUser: true,
			})
			console.log('App Launch');

		},
		async onShow() {
			const res = await Promise.all([request('wanted', {
				type: 'getWanted'
			}), request('star_focus', {
				type: 'getOneStarList'
			})]);
			console.log(res);
			let count = 0;
			res[0].data.forEach(item => {
				count += item.count;
				this.user.wantingGoods.set(item.goodId, item.count);
			});
			res[1].data.forEach(item => {
				this.user.addToLikeShareSet(item);
			});
			this.user.setTotalWantedGoods(count);
			console.log(this.user.wantingGoods)
			console.log('App Show');
		},
		async onHide() {
			console.log('App Hide');

		}
	}
</script>

<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
</style>
