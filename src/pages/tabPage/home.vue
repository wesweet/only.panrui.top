<!--
 * @Description: 应用首页
 * @Author: prui
 * @Date: 2024-04-17 13:49:25
 * @LastEditTime: 2024-04-17 19:58:29
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

    <!-- 功能模块 -->
    <uni-grid
      :column="3"
      :show-border="false"
      :square="false"
      :highlight="false"
      @change="change"
    >
      <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
        <view class="grid-item-box">
          <image class="image" :src="item.url" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
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

const list = reactive([
  {
    text: "小说",
    url: "/static/novel.png",
    page: "/pages/novel/index",
  },
  {
    text: "电影",
    url: "/static/movie.png",
  },
  {
    text: "音乐",
    url: "/static/music.png",
    page: "/pages/music/music",
  },
]);
const change = (e: any) => {
  // 将page声明为string或者undefined
  let page = list[e.detail.index].page;
  if (!page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
    });
  } else {
    // 判断当前执行环境
    uni.navigateTo({
      url: page,
    });
  }
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
.grid-item-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image {
    width: 25px;
    height: 25px;
  }
  .text {
    margin-top: 10rpx;
    font-size: 20rpx;
  }
}
.line {
  margin: 20rpx 10rpx;
  height: 10rpx;
  background-color: #808080;
  border-radius: 10rpx;
}
</style>
