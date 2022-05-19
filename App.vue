<script lang="ts">
	import request from '@/api/request';
	import {
		userStore
	} from '@/stores/user';
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
			const res = await request('star_focus', {
				type: 'getOneStarList'
			})
			res.data.forEach(item => {
				this.user.addToLikeShareSet(item);
			});
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
