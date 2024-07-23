<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-23 13:49:21
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-23 14:01:48
 * @FilePath: \only.panrui.top\src\pages\website\index.vue
 * @Description: 网址管理列表
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="网址管理" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
   <view class="icon-add" @click="toDetail('')">
      <up-icon name="plus" size="20" color="#909399"></up-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
// 定义分页参数
const pagination = reactive({
  page: 1,
  limit: 10,
});

// 初始化一个空对象，用于存放输入框的样式
const inputStyle = {};

let total = ref(0);
const keyword = ref("");
const search = () => {};
const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};

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