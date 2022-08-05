import {IsLogin,Authorization,UserId} from '@/common/constant.js'

//本地获取token
export function getToken() {
    return uni.getStorageSync(Authorization)
}

//设置登录状态
export function setLogin(islogin) {
    return uni.setStorageSync(IsLogin,islogin)
}

//设置用户ID
export function setUserId(userId) {
    return uni.setStorageSync(UserId,userId)
}


//token存本地
export function setToken(token) {
    return uni.setStorageSync(Authorization, token)
}

//移除token
export function removeToken() {
    return uni.removeStorageSync(Authorization)
}

//移除userId
export function removeUserId() {
    return uni.removeStorageSync(UserId)
}