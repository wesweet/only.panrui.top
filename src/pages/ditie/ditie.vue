<template>
	<uni-nav-bar shadow dark title="地铁线路图" />
</template>

<script lang="ts" setup>
	import { onMounted } from 'vue';
	const app = getApp()
	onMounted(() => {
		console.log(app.globalData)
	})
</script>

<style>

</style>