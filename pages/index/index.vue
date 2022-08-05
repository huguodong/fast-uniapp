<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view style="width: 100%;">
			<u-button type="primary" text="获取个人信息" @click="getUserInfo()"></u-button>
			<u-button type="error" text="退出登录" @click="loginOut()"></u-button>
		</view>
		<view>
			<text>{{userInfo}}</text>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		login
	} from "@/api/user.js"
	export default {
		data() {
			return {
				title: '首页',
				userInfo: ''
			}
		},
		onLoad() {
			// this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.$store.dispatch('UserInfo')
					.then(res => {
						// 显示登录成功
						uni.showToast({
							title: "请求成功"
						});
						this.userInfo = res;
					})
			},
			loginOut() {
				this.$store.dispatch('Logout')
					.then(res => {
						// 显示注销成功
						uni.showToast({
							title: "请求成功"
						});
						// 跳转到首页
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/index'
							});
						}, 1000)
					})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
