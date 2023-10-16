<!--
 * @Description: 首页
 * @Author: panrui
 * @Date: 2023-05-25 14:12:37
 * @LastEditTime: 2023-05-31 16:26:10
 * @LastEditors: panrui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <uni-notice-bar
    is-shadow="true"
    background-color="#e60033"
    color="#ffffff"
    show-icon
    scrollable
    text="初心不负App正式发布了、欢迎大家下载体验、有问题请联系我(1547177202)、谢谢！"
  />
  <uni-card @click="onClick" title="关于我">
    <image slot="cover" class="thumbnail" :src="cover" mode="widthFix"></image>
    <view class="uni-body">
      <text>醉后不知天在水</text>
      <text>满船清梦压星河</text>
    </view>
  </uni-card>
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
import { ref } from "vue";
const cover = ref("/static/panrui.jpg");
const onClick = () => {
  uni.navigateTo({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 100%;
}
.uni-body {
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #606266;
  display: flex;
  flex-direction: column;
}
</style>
