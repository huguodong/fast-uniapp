import request from "./core/request.js"
import {
	getToken,
	removeToken
} from "../storage/auth.js"

import {
	Authorization
} from '@/common/constant.js'

import {
	IS_DEV,
	DEV_URL,
	PRO_URL,
	REQUEST_LOG,
	TIMEOUT
} from "../config";

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: IS_DEV ? DEV_URL : PRO_URL,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'content-type': 'application/json;charset=UTF-8',
	},
	// 请求超时时间（默认6000）
	timeout: TIMEOUT,
	// 默认配置（可不写）
	config: {
		// 是否自动提示错误
		isPrompt: true,
		// 是否显示加载动画
		load: true,
		// 是否使用数据工厂
		isFactory: true
	}
});

//当前接口请求数
let requestNum = 0;
// 当前失败接口数
let requestFailNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
	if (options.load) {
		if (requestNum <= 0) {
			//打开加载动画
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
		requestNum += 1;
	}
	//请求前加入token，从缓存中读取token，请在登录后将token存储在本地缓存中
	options.header['Authorization'] = getToken();
	if (REQUEST_LOG) {
		_reqlog(options);
	}
	return options;
}
//请求结束
$http.requestEnd = function(options) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			uni.hideLoading();
		}
	}
}
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = async function(res) {
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		if (REQUEST_LOG) {
			_reslog(httpData);
		}
		if (typeof(httpData) == "string") {
			httpData = JSON.parse(httpData);
		}
		/*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
		// TODO: 判断数据是否请求成功，根据后端返回的成功状态码修改
		if (httpData.code == 200) {
			// 返回正确的结果(then接受数据)
			return Promise.resolve(httpData);
		} else { //其他错误提示
			if (res.isPrompt) {
				// 自动提示错误
				uni.showToast({
					title: httpData.info || httpData.msg,
					icon: "none",
					duration: 3000
				});
			}
			// 返回错误的结果(catch接受数据)
			return Promise.reject({
				statusCode: 500,
				errMsg: httpData.info || httpData.msg
			});
		}
		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
	} else if (res.response.statusCode && res.response.statusCode == 401) {
		// 用户身份信息过期处理，清除token并返回登录页
		if (requestFailNum <= 0) {
			removeToken();
			uni.showModal({
				title: '温馨提示',
				content: '登录状态过期，请重新登录！',
				confirmText: "确认",
				showCancel: false,
				success: function(result) {
					uni.reLaunch({
						url: '/pages/login/index'
					});
				}
			});
		}
		requestFailNum++;
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "登录状态过期"
		});
	} else if (res.response.statusCode && res.response.statusCode == 404) {
		// 接口地址不存在
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "请求失败，请检查接口地址是否正确"
		});
	} else {
		// 返回错误的结果(catch接受数据)
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "数据工厂验证不通过"
		});
	}
};
// 错误回调
$http.requestError = function(e) {
	if (!e.errMsg) {
		return;
	}
	// e.statusCode === 0 是参数校验错误抛出的
	if (e.statusCode === 0 || e.statusCode === 401) {
		throw e;
	} else {
		// 解决hideLoading会隐藏Toast的bug，setTimeout让showToast在requestEnd回调之后再执行
		setTimeout(() => {
			if (e.errMsg == "request:fail") {
				e.errMsg = "请求失败，请检查接口地址是否正确！"
			}
			uni.showToast({
				title: e.errMsg || "网络错误，请检查一下网络",
				icon: "none",
				duration: 3000
			});
		})
	}
}

//请求日志
function _reqlog(req) {
	console.log("请求地址：" + req.url)
	console.log("请求参数：" + JSON.stringify(req.data))
}
//响应日志
function _reslog(res) {
	console.log("响应结果：" + JSON.stringify(res))
}

export default $http;
