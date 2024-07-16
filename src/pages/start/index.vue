<!--
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-10 19:41:41
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-16 22:10:12
 * @FilePath: \only.panrui.top\src\pages\start\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
// 跳转登录页面
const login = () => {
  uni.navigateTo({
    url: "/pages/login/login",
  });
  // uni.switchTab({
  //   url: "/pages/tabBar/index",
  // });
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
