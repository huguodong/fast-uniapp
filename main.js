import Vue from 'vue'
import App from './App'
import store from './store'
import filter from '@/common/utils/filters.js';

import util from '@/common/utils/utils'
Vue.prototype.$util = util

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 引入router
import {
	router,
	RouterMount
} from '@/router/router.js'
Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

//引入vuex
import sotre from '@/store'

// #ifdef APP-PLUS
// 请勿删除此代码块
plus.runtime.quit = () => {
	
};
plus.nativeUI.toast = () => {
	return false;
};
// 请勿删除此代码块
// #endif
const app = new Vue({
	store,
    ...App
})


app.$mount()
 