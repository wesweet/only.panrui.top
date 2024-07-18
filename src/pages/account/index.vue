<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-18 17:15:31
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-18 17:16:20
 * @FilePath: \only.panrui.top\src\pages\account\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="账号" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="icon-add" @click="toDetail('')">
      <up-icon name="plus" size="20" color="#909399"></up-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
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
