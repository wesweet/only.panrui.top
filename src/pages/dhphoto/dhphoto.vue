<template>
	<StatusBar></StatusBar>
	<uni-section title="初见(2023.10.14)" type="line">
		<uni-card @click="onClick">
			<image slot='cover' style="width: 100%;" :src="jpgs[0]"></image>
			<text class="uni-body">与小丁的第一次见面，漫步在秋天的树下，远处的风在动，天边的云在动，站在你旁边的我，心也在动</text>
			<image :src="jpgs[1]" style="width: 100%;"></image>
			<text class="uni-body">人在看景，而我在看人</text>
<!-- 			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">分享</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('评论')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view>
			</view> -->
		</uni-card>
	</uni-section>
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
import { reactive } from "vue";
// const cover = ref("/static/panrui.jpg");
const jpgs = reactive([
	"/static/20231016101236.jpg",
	"/static/20231016101204.jpg",
])
const onClick = () => {
	console.log('onClick')
}
</script>

<style lang="scss">

</style>
