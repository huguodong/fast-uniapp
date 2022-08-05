# Fast-Uniapp

#### 介绍
uniapp开发基础模板，使用uView2.0框架作为项目UI基础，使用uni-simple-router管理路由。
使用了Vuex作为状态管理，并且对uni.request进行了二次封装。模板完成了登录认证及路由拦截等基础功能，下载后只需修改接口地址即可快速上手。

#### 软件架构
uniapp + uView2.0 + vuex+uni-simple-router

###	项目结构
```
├── api		               // 接口管理
│   └── user.js                // 示例
├── common                     // 公共文件
│   ├── request                // http请求封装
│   ├── storage                // 本地存储
│   ├── utils                  // 过滤器和一些通用方法
│   ├── config.js              // 环境配置 开发、生产环境地址配置，是否开发模式配置，超时等
│   └── constant.js            //一些常量
├── router                     //路由拦截
├── store                      //vuex
│   ├── modules                //模块化
│   ├── getters.js             //getters
│   ├── index.js               //初始化
│   └── mutation-types.js      //变量
├── uni_modules                // 插件市场插件目录
│   └── uview-ui
```


###  快速上手
1、从插件市场下载 `fast-uniapp` 模板

2、在项目根目录下执行 `npm install` 命令安装项目所需依赖

3、common/config 文件修改接口地址

4、运行项目即可


