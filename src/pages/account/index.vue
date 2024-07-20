<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-18 17:15:31
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-20 10:53:36
 * @FilePath: \only.panrui.top\src\pages\account\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="账号" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <up-search
      style="margin-top: 30px"
      :inputStyle="inputStyle"
      placeholder="请输入关键字"
      shape="square"
      :show-action="true"
      actionText="搜索"
      height="48"
      borderColor="#E7EAF0"
      bgColor="#FFFFFF"
      v-model="keyword"
      @custom="search"
    ></up-search>
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
    url: `/pages/account/detail?id=${id}`,
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
