<script lang="ts">
	import request from '@/api/request';
	import {
		ref
	} from 'vue'
	import {
		userStore
	} from '@/stores/user';
	import {
		commonStore
	} from '@/stores/store';
	export default {
		setup() {
			const user = userStore();
			const store = commonStore();

			const timer = ref < NodeJS.Timeout > ();
			const getRead =async ()=>{
				const mNoRead: {
					data: Array < any >
				} = await request("message", {
					type: "messageListCount"
				})

				if (mNoRead.data.length == 0) {
					store.updatemNoRead(false);
				} else {
					store.updatemNoRead(true);
				}
	
				
				const tNoRead: {
					data: Array < any >
				} = await request("message", {
					type: "messageListTouristsCount"
				})

				if (tNoRead.data.length == 0) {
					store.updatetNoRead(false);
				} else {
					store.updatetNoRead(true);
				}

			}

			const setTimer = () => {
				clearInterval(Number(timer.value))
				timer.value = setInterval(() => {
					getRead()
					
				}, 3000)
			}

			return {
				user,
				store,
				timer,
				setTimer,
				getRead
				
			}
		},
		onLaunch() {
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
			// this.setTimer();
			const res = await Promise.all([request('wanted', {
				type: 'getWanted'
			}), request('star_focus', {
				type: 'getOneStarList'
			}), request('order', {
				type: 'queryOrderStatus'
			})]);
			console.log(res);
			// wanted
			let count = 0;
			res[0].data.forEach(item => {
				count += item.count;
				this.user.wantingGoods.set(item.goodId, item.count);
			});
			this.user.setTotalWantedGoods(count);

			// star_focus
			res[1].data.forEach(item => {
				this.user.addToLikeShareSet(item);
			});

			// order
			this.user.setOrderMap(res[2].data);

			// console.log(this.user.wantingGoods)
			console.log('App Show');
		},
		async onHide() {
			console.log('App Hide');

			clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
</style>
