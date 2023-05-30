<template>
	<StatusBar></StatusBar>
	<uni-nav-bar shadow dark title="百宝箱" />
	<uni-grid :column="3" :square="false" :highlight="false" @change="change">
		<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
			<view class="grid-item-box">
				<image :src="item.url" class="image" mode="aspectFill" />
				<text class="text">{{ item.text }}</text>
			</view>
		</uni-grid-item>
	</uni-grid>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue';
	import StatusBar from "@/components/StatusBar.vue"
	const list = reactive([
		{
			text: "地铁线图",
			url: "/static/ditie.png",
			page: "/pages/ditie/ditie"
		},
		{
			text: "王者战绩",
			url: "/static/wzry.jpg"
		},
		{
			text: "盗版小说",
			url: "/static/dianzishu.png",
		},
		{
			text: "购物指南",
			url: "/static/gouwu-2.png",
		},
		{
			text: "文档",
			url: "/static/wendang.png",
			page: "/pages/wendang/wendang"
		},
		{
			text: "chatgpt",
			url: "/static/chat.png",
			page: "/pages/chatgpt/chatgpt"
		},
		{
			text: "地铁线路图",
			url: "/static/mieba.png"
		},
		{
			text: "地铁线路图",
			url: "/static/mieba.png"
		},
		{
			text: "地铁线路图",
			url: "/static/mieba.png"
		}
	])
	const change = (e : any) => {
		const page = list[e.detail.index].page
		if (!page) {
			uni.showToast({
				title: '功能正在开发中',
				duration: 2000
			});
		}
		uni.navigateTo({
			url: page
		})
	}
</script>

<style lang="scss">
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}
</style>