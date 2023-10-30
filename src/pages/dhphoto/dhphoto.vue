<template>
	<StatusBar></StatusBar>
	<uni-section title="初见(2023.10.14)" type="line">
		<uni-card @click="onClick">
			<image slot='cover' style="width: 100%;" :src="jpgs[0]"></image>
			<text class="uni-body">与小丁的第一次见面，漫步在秋天的树下，远处的风在动，天边的云在动，站在你旁边的我，心也在动</text>
			<image :src="jpgs[1]" style="width: 100%;"></image>
			<text class="uni-body">人在看景，而我在看人</text>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="redo" size="18" color="#999"></uni-icons>
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
			</view>
		</uni-card>
	</uni-section>
	<uni-section title="相遇(2023.10.29)" type="line">
		<uni-card @click="onClick">
			<image slot='cover' style="width: 100%;" :src="jpgs[2]"></image>
			<text class="uni-body">10.08相遇，跟潘潘相处了21天跟最初的热情逗比小瑞瑞相比越来越发现潘潘其实成熟，有自己的想法，洞察力强，很擅长在细节上观察到问题，然后梳理出前因后果，大概因为太聪明，有时候看的很明白，所以才对很多事情敏感，因为有自己的喜恶标准；内心很有力量，大概是有想要保护的人或者想保护自己想要保护的人，总觉得不够好要努力再努力；然后耐心有但不多，有时候你不愿意听的或者不喜欢我的地方你可能不会直接说或者回避了你不知道你能不能意识到，我能意识到的会自己注意，也在等你愿意自然想表达的时候，哪怕我们观点相左都没有关系。</text>
			<image :src="jpgs[3]" mode="aspectFill"></image>
			<text class="uni-body">遇到潘潘已经是我很幸运的一件事了，因为我享受了现在很好很好的潘潘今天印象最深的是，潘潘说:1.感受现在就好了2.没有那么多为什么突然意识到不知道从什么时候开始，我开始不断的量化，验证，推理人和事情，比如说性格合不合适，什么是对错、应该、爱与不爱，我做什么样或者对方做什么样可能会怎么样的结果；当曾经的这些小心思暴露出来，我才发现我在感情里自己困住了自己什么是爱呢？一见钟情是爱，分离也可能是爱的开始，不能说因为时间短不够了解和深刻就不是爱了，它真实发生着，在相处的过程中在爱的那一刻就是爱的，它不该被质疑，而分离也并不代表爱的结束，就像小王子和狐狸，在狐狸的眼中，那片金灿灿的麦田被赋予了小王子金黄色头发的回忆，如果真的喜欢，就不应该轻易放弃，好好感受现在跟潘潘相处的日子，我的人生还有一段是可以被潘潘爱和选择着，可是在潘潘的人生中呢，他也一直希望被爱和坚定的选择吧，抱抱潘潘</text>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="redo" size="18" color="#999"></uni-icons>
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
			</view>
		</uni-card>
	</uni-section>
	<uni-popup ref="popup" type="top">底部弹出 Popup</uni-popup>
	<view class="icon-add" @click="addClick">
	</view>
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
import { reactive } from "vue";
// const cover = ref("/static/panrui.jpg");
const jpgs = reactive([
	"/static/20231016101236.jpg",
	"/static/20231016101204.jpg",
	"/static/20231030090420.jpg",
	"/static/20231030090547.jpg",
	
])
const onClick = () => {
	console.log('onClick')
}
const addClick = () => {
	console.log('新增')
}
const actionsClick = (value: string) => {
	console.log(value)
	uni.showToast({
	  title: "功能正在开发中",
	  duration: 2000,
	});
}
</script>

<style lang="scss">
	.icon-add {
		position: fixed;
		right: 20rpx;
		bottom: 50rpx;
		z-index: 100;
		background-image: url('~@/static/add.png');
		width: 100rpx;
		height: 100rpx;
		background-size: 100%;
	}
	.card-actions {
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;
		.card-actions-item {
			display: flex;
			align-items: center;
			flex: 1;
			justify-content: center;
		}
	}
</style>
