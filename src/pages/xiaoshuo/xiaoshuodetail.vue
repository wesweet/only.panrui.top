<template>
  <StatusBar></StatusBar>
  <uni-nav-bar left-icon="left" shadow dark title="小说板块" @clickLeft="back" />

  <div class="web-view-container">
    <web-view ref="myWebView" :src="href"></web-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onMounted, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import StatusBar from "@/components/StatusBar.vue";
const href = ref("");
const fullscreen = ref(false);

// 获取url参数
onLoad((option: any) => {
  href.value = option.href;
});
const instance: any = getCurrentInstance();
onMounted(() => {
});
const back = () => {
  uni.navigateBack();
}
</script>

<style lang="scss">
uni-page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.web-view-container {
  flex: 1;
  display: flex;
}

web-view {
  width: 100%;
  height: 100%;
}
</style>
