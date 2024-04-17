<!--
 * @Description: 发现页
 * @Author: prui
 * @Date: 2024-04-17 13:49:41
 * @LastEditTime: 2024-04-17 21:55:22
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view class="page">
    <prstatus></prstatus>
    <uni-section title="基础卡片" type="line">
      <uni-card>
        <!-- 功能模块 -->
        <uni-grid
          :column="3"
          :show-border="false"
          :square="false"
          :highlight="false"
          @change="change"
        >
          <uni-grid-item
            v-for="(item, index) in list"
            :index="index"
            :key="index"
          >
            <view class="grid-item-box">
              <image class="image" :src="item.url" mode="aspectFill" />
              <text class="text">{{ item.text }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </uni-card>
    </uni-section>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const list = reactive([
  {
    text: "小说",
    url: "/static/novel.png",
    page: "/pages/novel/index",
    isApp: true,
  },
  {
    text: "电影",
    url: "/static/movie.png",
    isApp: true,
  },
  {
    text: "音乐",
    url: "/static/music.png",
    page: "/pages/music/music",
    isApp: true,
  },
  {
    text: "文档",
    url: "/static/document.png",
    page: "/pages/document/document",
    isApp: true,
  },
]);
let change: any = null;
// #ifdef H5
change = (e: any) => {
  let page = list[e.detail.index].page;
  let isApp = list[e.detail.index].isApp;
  if (isApp) {
    uni.showToast({
      title: "请先下载APP",
      duration: 2000,
      icon: "error",
    });
    return;
  }
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
// #endif

// #ifdef APP-PLUS
change = (e: any) => {
  let page = list[e.detail.index].page;
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
// #endif
</script>

<style lang="scss">
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
</style>
