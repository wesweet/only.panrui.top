<!--
 * @Description: 发现页
 * @Author: prui
 * @Date: 2024-04-17 13:49:41
 * @LastEditTime: 2024-04-18 10:05:30
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view class="page">
    <prstatus></prstatus>
    <!-- 功能模块 -->
    <uni-section title="摸鱼" type="line">
      <uni-card>
        <!-- 功能模块 -->
        <uni-grid
          :column="3"
          :show-border="false"
          :square="false"
          :highlight="false"
          @change="listChange"
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

    <!-- 恋爱模块 -->
    <uni-section title="我与小丁的那些事" type="line">
      <uni-card>
        <!-- 恋爱模块 -->
        <uni-grid
          :column="3"
          :show-border="false"
          :square="false"
          :highlight="false"
          @change="loveListChange"
        >
          <uni-grid-item
            v-for="(item, index) in loveList"
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

    <!-- 测试模块 -->
    <uni-section title="测试模块" type="line">
      <uni-card>
        <!-- 恋爱模块 -->
        <uni-grid
          :column="3"
          :show-border="false"
          :square="false"
          :highlight="false"
          @change="testChange"
        >
          <uni-grid-item
            v-for="(item, index) in testList"
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
]);

const loveList = reactive([
  {
    text: "时光机",
    url: "/static/dhphoto.png",
    page: "/pages/dhphoto/dhphoto",
  },
  {
    text: "照片墙",
    url: "/static/photo.png",
    page: "/pages/webview/photo",
    isApp: true,
  },
]);

const testList = reactive([
  {
    text: "文档",
    url: "/static/wendang.png",
    page: "/pages/webview/wendang",
    isApp: true,
  },
]);

const change = (index: number, type: string) => {
  let info: any = null;
  if (type == "list") {
    info = list[index];
  } else if (type == "loveList") {
    info = loveList[index];
  } else if (type == "testList") {
    info = testList[index];
  }
  // #ifdef H5
  if (info.isApp || !info.page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
      icon: "error",
    });
    return;
  }
  // #endif

  // #ifdef APP-PLUS
  if (!info.page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
      icon: "error",
    });
    return;
  }
  // #endif

  uni.navigateTo({
    url: info.page,
  });
};

const listChange = (e: { detail: { index: number } }) => {
  change(e.detail.index, "list");
};
const loveListChange = (e: { detail: { index: number } }) => {
  change(e.detail.index, "loveList");
};
const testChange = (e: { detail: { index: number } }) => {
  change(e.detail.index, "testList");
};
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
.uni-grid-item {
  margin-bottom: 20rpx;
}
</style>