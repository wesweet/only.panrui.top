<template>
	<uni-nav-bar shadow dark title="地铁线路图" />
	<web-view src="/hybrid/html/metro.html" :fullscreen="fullscreen"></web-view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	const app = getApp()
	console.log(app.globalData)
	const fullscreen = ref(true)
	onMounted(() => {

	})
</script>

<style lang="scss" scoped>
	uni-page-body {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>