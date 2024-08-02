<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-23 13:49:21
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-08-02 15:04:32
 * @FilePath: \only.panrui.top\src\pages\website\index.vue
 * @Description: 网址管理列表
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="网址管理" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="website-box">
      <view class="item" v-for="(item, index) in websiteList">
        <up-tag :text="item.tag.name"></up-tag>
        <view class="website-list">
          <view class="item-box" v-for="(m, n) in item.websites">
            <up-text :text="m.name"></up-text>
            <up-text :text="m.desc"></up-text>
          </view>
        </view>
      </view>
    </view>

    <up-back-top :scroll-top="scrollTop"></up-back-top>
    <view class="icon-add" @click="toDetail('')">
      <up-icon name="plus" size="20" color="#909399"></up-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { WEBSITE_API } from "@/api/website";
import {
  onPullDownRefresh,
  onReachBottom,
  onShow,
  onPageScroll,
} from "@dcloudio/uni-app";

onShow(() => {
  getWebsiteList();
});

// 定义分页参数
const pagination = reactive({
  page: 1,
  limit: 999,
});

const websiteList = ref<any[]>([]);
let total = ref(0);
// 加载网站列表
const getWebsiteList = () => {
  request(WEBSITE_API.website, {
    method: "GET",
    data: {
      ...pagination,
    },
  }).then((res: any) => {
    const { errorCode, errorMessage, data } = res;
    if (errorCode != 0) {
      uni.showToast({
        title: errorMessage,
        duration: 500,
        icon: "error",
      });
      return;
    }
    if (data && data.list.length > 0) {
      websiteList.value = data.list;
      total.value = data.total;
    }
  });
};

// 初始化一个空对象，用于存放输入框的样式
const inputStyle = {};

const keyword = ref("");
const search = () => {};
const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};

const scrollTop = ref(0);

// 监听页面滚动事件，更新滚动位置
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
// 跳转到详情页面
const toDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/website/detail?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
body,
uni-page-body {
  height: 100%;
}
.page-wrap {
  overflow: auto;
  padding: calc(var(--status-bar-height) + 50px) 24px 0;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  min-height: 100%;
  box-sizing: border-box;
}
.website-box {
  .item {
    margin-bottom: 20px;
    .website-list {
      display: flex;
      flex-direction: column;
      .item-box {
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
.icon-add {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  width: 40px;
  height: 40px;
  bottom: 30px;
  border-radius: 50%;
  background-color: #e1e1e1;
}
</style>
