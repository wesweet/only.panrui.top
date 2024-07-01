<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-01 16:38:26
 * @FilePath: \only.panrui.top\src\pages\tabbar\index.vue
-->
<template>
  <view class="page-wrap">
    <u-notice-bar
      text="初心不负App正式发布了、欢迎大家下载体验、有问题请联系我(1547177202)、谢谢！"
    ></u-notice-bar>

    <up-gap height="10" bgColor="#fff"></up-gap>

    <u-swiper
      :list="swiperList"
      keyName="image"
      height="180"
      showTitle
      :autoplay="false"
      circular
    ></u-swiper>

    <up-gap height="10" bgColor="#fff"></up-gap>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const swiperList = ref([
  {
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
    image: "/static/fengjing1.jpg",
  },
]);
</script>

<style lang="scss" scoped>
.page-wrap {
  box-sizing: border-box;
  padding: 10px;
}
</style>
