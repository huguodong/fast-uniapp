import http from '@/common/request'

// api地址
const api = {
	// TODO: 根据自身需求，修改登录和获取用户信息接口
	login: `/login`,
	getUserInfo: `/getLoginUser`
}

// 用户登录
export const login = (params, config = {}) => http.post(api.login, params, config)

// 获取用户信息
export const getUserInfo = (params) => http.get(api.getUserInfo,params)

