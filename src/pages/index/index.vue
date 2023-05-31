<template>
  <StatusBar></StatusBar>
  <uni-nav-bar shadow dark title="首页" />
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
// 判断本地缓存是否存在token: 不存在则跳转到登录页
if (!uni.getStorageSync("token")) {
  uni.redirectTo({ url: "/pages/login/login" });
}
</script>

<style lang="scss" scoped></style>
