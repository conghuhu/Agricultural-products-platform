import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia(), uView);
	return {
		app,
		Pinia,
	}
}
// #endif