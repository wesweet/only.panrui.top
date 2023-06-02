<!--
 * @Description: 
 * @Author: panrui
 * @Date: 2023-05-25 16:11:02
 * @LastEditTime: 2023-06-02 21:29:33
 * @LastEditors: panrui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <view class="hd">
    <view class="logout">
      <uni-button
        type="primary"
        size="mini"
        @click="logout"
        style="margin-right: 20rpx"
      >
        退出登录
      </uni-button>
    </view>
  </view>
  <view class="list">
    <uni-title
      type="h3"
      title="个人中心"
      color="#d7003a"
      style="padding-left: 20rpx"
    ></uni-title>
    <uni-grid :column="3" :square="false" :highlight="false">
      <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
        <view class="grid-item-box">
          <image :src="item.url" class="image" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
  <view class="list">
    <uni-title
      type="h3"
      title="我的消息"
      color="#d7003a"
      style="padding-left: 20rpx"
    ></uni-title>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in list"
        :index="index"
        :key="index"
        :title="item.text"
        :thumb="item.url"
      ></uni-list-item>
    </uni-list>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { fetchUserInfo } from "@/api/app";

const list = reactive([
  {
    text: "地铁线图",
    url: "/static/ditie.png",
    page: "/pages/ditie/ditie",
  },
  {
    text: "王者战绩",
    url: "/static/wzry.jpg",
  },
  {
    text: "盗版小说",
    url: "/static/dianzishu.png",
  },
  {
    text: "购物指南",
    url: "/static/gouwu-2.png",
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
    text: "地铁线路图",
    url: "/static/mieba.png",
  },
  {
    text: "地铁线路图",
    url: "/static/mieba.png",
  },
  {
    text: "地铁线路图",
    url: "/static/mieba.png",
  },
]);

onReady(() => {
  // 从本地缓存中获取userId
  const userId = uni.getStorageSync("userId");
  // 如果userId不存在,则跳转到登录页面
  if (!userId) {
    // 清空缓存
    uni.clearStorageSync();
    uni.redirectTo({
      url: "/pages/login/login",
    });
    return;
  }
  // 获取用户信息
  fetchUserInfo({ id: userId }).then((res: any) => {
    if (res.errorCode === 0) {
      // 将用户信息存储到本地缓存中
      uni.setStorageSync("userInfo", res.data);
    }
  });
});

// 退出登录
const logout = () => {
  // 清空缓存
  uni.clearStorageSync();
  uni.redirectTo({
    url: "/pages/login/login",
  });
};
</script>

<style lang="scss" scoped>
.hd {
  background-color: #bf242a;
  height: 256rpx;
}
.list {
  margin-bottom: 20rpx;
  .grid-item-box {
    flex: 1;
    // position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }

  .image {
    width: 25px;
    height: 25px;
  }

  .text {
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
