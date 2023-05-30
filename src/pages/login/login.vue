<template>
	<view>
		<uni-forms ref="form" class="uni-forms">
			<uni-forms-item label="账号" name="">
				<uni-easyinput class="uni-mt-5" trim="all" v-model="formData.username"
					placeholder="请输入内容"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="密码" name="">
				<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"></uni-easyinput>
			</uni-forms-item>
			<button @click="login">登录</button>
		</uni-forms>
	</view>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue';
	import { fetchLogin } from '@/api/app'
	// 定义表单
	const formData = reactive({
		username: '',
		password: '',
	});
	const login = () => {
		fetchLogin(formData).then((res : any) => {
			console.log(res)
			// 获取到返回值后，判断是否登录成功，成功则跳转到首页，并且在缓存当中存储token,失败则提示错误信息，不跳转，继续停留在登录页，等待用户重新输入，直到登录成功为止，
			// 为了方便，这里直接跳转到首页	
			if (res.code === 200) {
				uni.setStorageSync('token', res.data.token)
				uni.switchTab({
					url: '/pages/index/index'
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
	}
</script>

<style lang="scss" scoped>
	.uni-forms {
		padding: 100rpx 50rpx 0;
	}
</style>