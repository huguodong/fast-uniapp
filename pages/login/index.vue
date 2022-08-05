<template>
	<view class="app-container">
		<view class="login-page">
			<view class="login-bg">
				<view class="logo">
					<image class="cover-image" src="/static/logo.png"></image>
				</view>
				<view class="title">登录页面</view>
			</view>
			<view class="login-form">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<u-form-item prop="account" borderBottom>
						<u-input v-model="form.account" placeholder="请输入用户名" clearable border="none"
							prefixIcon="account" :prefixIconStyle="{ fontSize: '30px' }">
						</u-input>
					</u-form-item>
					<u-form-item prop="password" borderBottom>
						<u-input v-model="form.password" placeholder="请输入密码" password clearable border="none"
							prefixIcon="lock" :prefixIconStyle="{ fontSize: '30px' }">
						</u-input>
					</u-form-item>
					<u-form-item>
						<u-button type="primary" @click="handleSubmit">登 录</u-button>
					</u-form-item>
				</u--form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				form: {
					account: 'superadmin',
					password: '123456'
				},
				rules: {
					account: [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		methods: {
			// 登录按钮操作
			handleSubmit() {
				// this.$Router.push('/pages/index/index');//测试路由守卫
				
				this.$refs.form.validate().then(res => {
					this.$store.dispatch('Login', this.form)
						.then(res => {
							// 显示登录成功
							uni.showToast({
								title: "登录成功"
							});
							// 跳转到首页
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 1000)
						})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-page {
		flex: 1;
		background-color: #FFFFFF;

		.login-bg {
			width: 100%;
			height: 250px;
			background: #55aaff;
			background-size: cover;
			overflow: hidden;

			.logo {
				width: 100px;
				height: 100px;
				margin: 50px auto 0;

				.cover-image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.title {
				display: block;
				font-size: 20px;
				line-height: 50px;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.login-form {
			padding: 20px;

			::v-deep .u-form-item {
				margin-top: 20px;

				.login-icon {
					width: 25px;
					height: 25px;
					margin-right: 20px;
				}
			}
		}
	}
</style>
