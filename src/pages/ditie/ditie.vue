<template>
  <uni-nav-bar shadow dark title="地铁线路图" />
  <web-view src="/hybrid/html/metro.html" :fullscreen="fullscreen"></web-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const app = getApp();
const fullscreen = ref(true);
</script>

<style lang="scss" scoped>
uni-page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
