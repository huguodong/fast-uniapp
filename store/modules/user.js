import {
	login,
	getUserInfo
} from '@/api/user.js';

import {
	SET_TOKEN,
	SET_USER_ID,
	SET_USERINFO,
	SET_IS_LOGIN
} from '@/store/mutation-types.js';

import {
	getToken,
	setToken,
	setUserId,
	removeToken,
	removeUserId
} from '@/common/storage/auth.js';

const user = {
	state: {
		// 用户认证token
		token: getToken(),
		// 用户ID
		userId: null,
		// 用户信息
		userInfo: {},
		//是否登录
		isLogin: false
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER_ID: (state, userId) => {
			state.userId = userId
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_IS_LOGIN: (state, isLogin) => {
			state.isLogin = isLogin
		},
	},

	actions: {
		// 用户登录
		Login({
			commit
		}, userInfo) {
			return new Promise(async (resolve, reject) => {
				// TODO: 用户登录处理，根据需求修改
				const res = await login(userInfo);
				setToken('Bearer '+res.data); //token存本地
				commit(SET_IS_LOGIN, true);//登录状态存vuex
				commit(SET_TOKEN,'Bearer '+res.data); //token存vuex
				
				resolve(res);
			})
		},

		// 获取用户信息
		UserInfo({
			commit
		}) {
			return new Promise(async (resolve, reject) => {
				// TODO: 获取用户信息处理，根据需求修改
				try {
					const res = await getUserInfo();
					setUserId(res.data.id);//用户ID存本地
					commit(SET_USER_ID, res.data.id);//用户ID存vuex
					commit(SET_USERINFO, res.data);//用户信息存Vues
					resolve(res);
				} catch (e) {
					reject(e);
				}
			})
		},

		// 退出登录
		Logout({
			commit
		}) {
			return new Promise((resolve, reject) => {
				//清除本地和vuex的存储信息
				removeToken();
				removeUserId();
				commit(SET_TOKEN, null);
				commit(SET_USER_ID, null);
				commit(SET_IS_LOGIN, false);
				resolve()
			})
		}

	}
}

export default user
