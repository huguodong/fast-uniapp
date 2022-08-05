
export default{
	
	/**
	 * 枚举定义工具
	 * 示例：
	 * const STATUS = createEnum({
	 *     AUDIT_WAIT: [1, '审核中'],
	 *     AUDIT_PASS: [2, '审核通过']
	 * })
	 * 获取枚举值：STATUS.AUDIT_WAIT
	 * 获取枚举描述：STATUS.getDesc('AUDIT_WAIT')
	 * 通过枚举值获取描述：STATUS.getDescFromValue(STATUS.WAIT)
	 *
	 */
	createEnum(definition){
		const strToValueMap = {}
		  const numToDescMap = {}
		  for (const enumName of Object.keys(definition)) {
		    const [value, desc] = definition[enumName]
		    strToValueMap[enumName] = value
		    numToDescMap[value] = desc
		  }
		  return {
		    ...strToValueMap,
		    getDesc(enumName) {
		      return (definition[enumName] && definition[enumName][1]) || ''
		    },
		    getDescFromValue(value) {
		      return numToDescMap[value] || ''
		    }
		  }
	},
	/**
	  * @Description:时间格式化
	  * 
	  * @author
	  * 
	  * @param 
	  * @return 
	  * 
	  * @createTime: 2022-08-04 14:07:37
	  */
	formatTime(time) {
	 	if (typeof time !== 'number' || time < 0) {
	 		return time
	 	}
	 
	 	var hour = parseInt(time / 3600)
	 	time = time % 3600
	 	var minute = parseInt(time / 60)
	 	time = time % 60
	 	var second = time
	 
	 	return ([hour, minute, second]).map(function (n) {
	 		n = n.toString()
	 		return n[1] ? n : '0' + n
	 	}).join(':')
	 },
	  
	 /*
	  * @description 生成时间戳
	  */
	 timestamp(){
	   var date = new Date();
	   var month = date.getMonth() + 1;
	   var strDate = date.getDate();
	   var hours = date.getHours();
	   var Minutes = date.getMinutes();
	   var Seconds = date.getSeconds();
	   if (month >= 1 && month <= 9) {
	     month = "0" + month;
	   }
	   if (strDate >= 0 && strDate <= 9) {
	     strDate = "0" + strDate;
	   }
	   if (hours >= 0 && hours <= 9) {
	     hours = "0" + hours;
	   }
	   if (Minutes >= 0 && Minutes <= 9) {
	     Minutes = "0" + Minutes;
	   }
	   if (Seconds >= 0 && Seconds <= 9) {
	     Seconds = "0" + Seconds;
	   }
	   var times = date.getFullYear() + '' + month + '' + strDate + '' + hours + '' + Minutes + '' + Seconds;
	   return times;
	 },
	 /*
	  * @description 计算两个时间之间的时间差 多少天时分秒
	  * @param endTime 结束时间
	  */
	intervalTime(beginTime,endTime) {
		let start=beginTime;
		let end=endTime
		if(beginTime < endTime){
		    start = beginTime;
		    end = endTime;
		 }else{
		    start = endTime;
		    end = beginTime;
		 }
		  var date3 =  (end- start)*1000; //时间差的毫秒数
	     //计算出相差天数
	     var days = Math.floor(date3 / (24 * 3600 * 1000));
	     //计算出小时数
	     var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	     var hours = Math.floor(leave1 / (3600 * 1000));
	 	
	     //计算分钟数
	     var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
	     var minutes = Math.floor(leave2 / (60 * 1000));
	 
	     //计算秒数
	     var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
	     var seconds = Math.round(leave3 / 1000);
	 	return  days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
	 },
	 
	 /*
	  * @description 判读是否为外链
	  * @param path
	  * @returns {boolean}
	  */
	 isExternal(path) {
	   return /^(https?:|mailto:|tel:)/.test(path);
	 },
	 /**
	  * @description 校验密码是否小于6位
	  * @param str
	  * @returns {boolean}
	  */
	isPassword(str) {
	   return str.length >= 6;
	 },
	 
	 /**
	  * @description 判断是否为数字
	  * @param value
	  * @returns {boolean}
	  */
	isNumber(value) {
	   const reg = /^[0-9]*$/;
	   return reg.test(value);
	 },
	 
	 /**
	  * @description 判断是否是小写字母
	  * @param str
	  * @returns {boolean}
	  */
	 isLowerCase(str) {
	   const reg = /^[a-z]+$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否是大写字母
	  * @param str
	  * @returns {boolean}
	  */
	 isUpperCase(str) {
	   const reg = /^[A-Z]+$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否是大写字母开头
	  * @param str
	  * @returns {boolean}
	  */
	 isAlphabets(str) {
	   const reg = /^[A-Za-z]+$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否是字符串
	  * @param str
	  * @returns {boolean}
	  */
	 isString(str) {
	   return typeof str === "string" || str instanceof String;
	 },
	 
	 /**
	  * @description 判断是否是数组
	  * @param arg
	  * @returns {arg is any[]|boolean}
	  */
	 isArray(arg) {
	   if (typeof Array.isArray === "undefined") {
	     return Object.prototype.toString.call(arg) === "[object Array]";
	   }
	   return Array.isArray(arg);
	 },
	 
	 /**
	  * @description 判断是否是手机号
	  * @param str
	  * @returns {boolean}
	  */
	 isPhone(str) {
	   const reg = /^1\d{10}$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否是身份证号(第二代)
	  * @param str
	  * @returns {boolean}
	  */
	 isIdCard(str) {
	   const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否是邮箱
	  * @param str
	  * @returns {boolean}
	  */
	 isEmail(str) {
	   const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否中文
	  * @param str
	  * @returns {boolean}
	  */
	 isChina(str) {
	   const reg = /^[\u4E00-\u9FA5]{2,4}$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否为空
	  * @param str
	  * @returns {boolean}
	  */
	 isNull(str) {
	   return (
	     str == null ||
	     false ||
	     str === "" ||
	     str.trim() === "" ||
		 str == undefined || 
	     str.toLocaleLowerCase().trim() === "null"
		 
	   );
	 },
	 
	 /**
	  * @description 判断是否为固话
	  * @param str
	  * @returns {boolean}
	  */
	 isTel(str) {
	   const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
	   return reg.test(str);
	 },
	 
	 /**
	  * @description 判断是否为数字且最多两位小数
	  * @param str
	  * @returns {boolean}
	  */
	 isNum(str) {
	   const reg = /^\d+(\.\d{1,2})?$/;
	   return reg.test(str);
	 }
}