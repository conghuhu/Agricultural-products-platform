import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);
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
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	app.use(uView)
		.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}
// #endif