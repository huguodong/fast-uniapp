import Vue from 'vue'
import store from '@/store'
import {
	IS_DEV,
	DEV_URL,
	PRO_URL
} from "../config";

//过滤图片地址，如果不是网络地址则拼接域名
Vue.filter('img', (value) => {
	let url = IS_DEV ? DEV_URL : PRO_URL;
	if (value != undefined && value != null) {
		if (value.indexOf('http') != -1) {
			return value;
		}
	}
	return url + value;
})

//格式化阅读数量
Vue.filter('view', (value) => {
	if (value != undefined && value != null) {
		if (value >= 10000) {
			var v = (value / 10000).toFixed(1) + 'w'
			return v;
		}
	}
	return value;
})
//格式化金额
Vue.filter('price', (value) => {
	if (value != undefined && value != null) {
		if (value >= 10000) {
			var v = (value / 10000).toFixed(1) + '万'
			return v;
		}
	}
	return value;
})

//大写转小写数字
Vue.filter('number', (value) => {
	if (value != undefined && value != null) {
		let result = 0;
		switch (value) {
			case '0':
				result = '0';
				break;
			case '零':
				result = '0';
				break;
			case '一':
				result = '1';
				break;
			case '二':
				result = '2';
				break;
			case '三':
				result = '3';
				break;
			case '四':
				result = '4';
				break;
			case '五':
				result = '5';
				break;
			case '六':
				result = '6';
				break;
			case '七':
				result = '7';
				break;
			case '八':
				result = '8';
				break;
			case '九':
				result = '9';
				break;
			case '十':
				result = '10';
				break;
		}
		return result;
	}
	return;
})
//格式化时间戳
Vue.filter('date', (timeStamp, format = 'Y-m-d H:i') => {
	if (!timeStamp) return '';
	return date(format, timeStamp);
})

//计算多久之前
Vue.filter('datestr', (d) => {
	var date = new Date(d);
	var now = new Date;
	var dt = now - date;
	var s = dt / 1000;
	var m = s / 60;
	var h = m / 60;
	if (s < 60) {
		return s + '秒前';
	} else if (s < 3600) {
		return parseInt(s / 60) + '分钟前';
	} else if (s < 86400) {
		return parseInt(s / 60 / 60) + '小时前';
	} else if (s < 604800) { //在一周内
		return parseInt(s / 60 / 60 / 24) + '天前';
	} else if (s < 2592000) {
		return parseInt(s / 60 / 60 / 24 / 7) + "周前"
	} else if (s < 2592000 && s > 604800) { //超过一周
		return parseInt(s / 60 / 60 / 24) + '天前';
	} else if (s < 31104000) {
		return parseInt(s / 60 / 60 / 24 / 30) + '月前';
	} else if (s < 311040000) {
		return parseInt(s / 60 / 60 / 24 / 30 / 12) + '年前';
	} else {
		return d;
	}
})


//身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
Vue.filter('idcard', (value) => {
	if (!value) {
		return ''
	} else {
		let data = value.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
		return data
	}
})

// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
Vue.filter('telHide', (value) => {
	if (!value) {
		return ''
	} else {
		let data = value.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
		return data
	}
})

// 姓名脱敏(小明 转换成 *明   李小明 转换成 李*明   欧阳小明 转换成 欧**明)
Vue.filter('nameHide', (value) => {
	if (!value) {
		return ''
	} else {
		if (value.length === 2) {
			return new Array(value.length).join('*') + value.substr(-1)
		} else {
			return (
				value.substr(0, 1) + new Array(value.length - 1).join('*') + value.substr(-1)
			)
		}
	}
})

//格式化银行卡号，4位放一个空格
Vue.filter('formataccNo', (accNo) => {
	let result = '',
		index = 0;
	if (accNo != undefined && accNo != null) {
		for (let i = 0; i < accNo.length; i++) {
			result += accNo.charAt(i);
			index++;
			if (index == 4 && (i + 1 != accNo.length)) {
				result += " ";
				index = 0;
			}
		}
	}
	return result;
})
// 银行卡脱敏
Vue.filter('bankCardHide', (value) => {
	if (!value) {
		return
	}
	if (value) {
		let reg = /^(\d{4})\d+(\d{4})$/;
		let _str = '*';
		let _len = value.length - 8;
		if (_len > 1 && _len < 16) {
			for (let i = 0; i < _len; i++) {
				_str = _str + '*'
			}
			console.log(_str)
			let _num = value.replace(reg, `$1${_str}$2`);
			return _num;
		} else {
			let _num = value.replace(reg, `$1****$2`);
			return _num;
		}
	}
})
