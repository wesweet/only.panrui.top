<!--
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-10 19:41:41
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-16 22:10:12
 * @FilePath: \only.panrui.top\src\pages\start\index.vue
 * @Description: 启动页
-->
<template>
  <view class="page-wrap">
    <view class="text">打开唯一，发现美好</view>
    <view class="btn" @click="login">
      <up-icon name="arrow-rightward" color="#fff" size="28"></up-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { route } from "@/uni_modules/uview-plus";
// 跳转登录页面
const login = () => {
  if (!uni.getStorageSync("token")) {
    route({
      url: "/pages/login/login",
    });
    return;
  }
  route({
    type: "switchTab",
    url: "/pages/tabBar/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://static.panrui.top/images/only/start.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .text {
    margin-bottom: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background-color: #de433b;
    border-radius: 50%;
  }
}
</style>
