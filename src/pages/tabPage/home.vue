<!--
 * @Description: 应用首页
 * @Author: prui
 * @Date: 2024-04-17 13:49:25
 * @LastEditTime: 2024-04-17 15:08:45
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view>
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
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 定义轮播图样式
const dotStyle = ref(true);

const swiperList = ref([
  {
    type: "image",
    url: "/static/mmexport1710765206106.jpg",
  },
  {
    type: "image",
    url: "/static/fengjing1.jpg",
  },
  {
    type: "image",
    url: "/static/mmexport1710765211570.jpg",
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
</style>
