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
	import { reactive } from "vue";
	import StatusBar from "@/components/StatusBar.vue";
	const list = reactive([
		{
			text: "地铁",
			url: "/static/ditie.png",
			page: "/pages/ditie/ditie",
		},
		{
			text: "王者",
			url: "/static/wzry.jpg",
		},
		{
			text: "小说",
			url: "/static/dianzishu.png",
		},
		{
			text: "购物",
			url: "/static/gouwu-2.png",
		},
		{
			text: "瑞瑞和叮叮的流浪日记",
			url: "/static/love.png",
			page: "/pages/dhphoto/dhphoto",
		},
		{
			text: "文档",
			url: "/static/wendang.png",
			page: "/pages/wendang/wendang",
		},
		{
			text: "chatgpt",
			url: "/static/chat.png",
			page: "/pages/chatgpt/chatgpt",
		},
		{
			text: "音乐",
			url: "/static/mieba.png",
		},

		{
			text: "电影",
			url: "/static/mieba.png",
		},
	]);
	const change = (e : any) => {
		const page = list[e.detail.index].page;
		if (!page) {
			uni.showToast({
				title: "功能正在开发中",
				duration: 2000,
			});
		} else {
			uni.navigateTo({
				url: page,
			});
		}
	};
</script>

<style lang="scss">
	.uni-grid-item {
		height: 220rpx;
	}
	.grid-item-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	.uni-grid-item__box {
		height: 220rpx;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		padding: 0 10rpx;
		font-size: 14px;
		margin-top: 5px;
		text-align: center;
	}
</style>