<!--
 * @Description: 应用首页
 * @Author: prui
 * @Date: 2024-04-17 13:49:25
 * @LastEditTime: 2024-04-17 21:49:57
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <prstatus></prstatus>
  <uni-notice-bar
    is-shadow="true"
    background-color="#161823"
    show-icon
    scrollable
    text="初心不负App正式发布了、欢迎大家下载体验、有问题请联系我(1547177202)、谢谢！"
  />
  <!-- 轮播图 -->
  <swiper
    class="screen-swiper"
    :class="dotStyle ? 'square-dot' : 'round-dot'"
    :indicator-dots="true"
    :circular="true"
    :autoplay="true"
    interval="5000"
    duration="500"
  >
    <swiper-item
      v-for="(item, index) in swiperList"
      :key="index"
      @tap="toInfo(item)"
    >
      <view class="swiper-box">
        <image
          :src="item.url"
          class="slide-image"
          mode="aspectFill"
          v-if="item.type == 'image'"
        ></image>
      </view>
    </swiper-item>
  </swiper>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

// 定义轮播图样式
const dotStyle = ref(true);

const swiperList = ref([
  {
    type: "image",
    url: "/static/fengjing1.jpg",
  },
]);
const toInfo = (item: any) => {
  console.log(item);
};
</script>

<style lang="scss">
uni-swiper {
  height: 400rpx;
}
swiper-item {
  padding: 15rpx 25rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
}
.screen-swiper {
  margin-bottom: 40rpx;
  border-radius: 20rpx;
}
.swiper-box {
  display: flex;
  justify-content: center;
  height: 100%;
  .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
}
.line {
  margin: 20rpx 10rpx;
  height: 10rpx;
  background-color: #808080;
  border-radius: 10rpx;
}
</style>
