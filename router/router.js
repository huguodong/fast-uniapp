// router.js
import {
	RouterMount,
	createRouter,
	runtimeQuit
} from 'uni-simple-router'
import {
	getToken,
	removeToken
} from '@/common/storage/auth.js'
import store from '@/store'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerErrorEach: ({
		type,
		level,
		...args
	}) => {
		// #ifdef APP-PLUS
		// 请勿删除此代码块
		if (type === 3) {
			router.$lockStatus = false;
			uni.showModal({
				title: '提示',
				content: '您确定要退出应用吗？',
				success: function(res) {
					if (res.confirm) {
						let main = plus.android.runtimeMainActivity();
						plus.runtime.quit = function() {
							main.moveTaskToBack(false);
						};
						plus.runtime.quit();
					}
				}
			});
		}
		// 请勿删除此代码块
		// #endif
	},
	applet: {
		animationDuration: 300 //默认 300ms  v2.0.6+
	},
	routes: [...ROUTES]
});

// 免登录白名单
const whiteList = ['/pages/login/index']

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (getToken()) {
		/* 存在token */
		if (to.path === '/pages/login/index') {
			next({
				path: '/pages/index/index',
				NAVTYPE: 'replace'
			})
		} else {
			if (!store.getters.userId) {
				// 判断当前用户是否已拉取完userInfo信息
				store.dispatch('UserInfo').then((res) => {
					next();
				}).catch(() => {
					next();
				})
			} else {
				next();
			}
		}
	} else {
		/* 不存在token */
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next();
		} else {
			removeToken();
			next({
				path: '/pages/login/index',
				NAVTYPE: 'replaceAll'
			})
		}
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {})

export {
	router,
	RouterMount
}
