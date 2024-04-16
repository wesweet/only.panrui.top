<template>
  <StatusBar></StatusBar>
  <uni-nav-bar left-icon="left" shadow dark title="小说板块" />
  <div class="web-view-container">
    <web-view :src="href"></web-view>
  </div>
</template>

<script setup lang="ts">
// 导入 StatusBar
import StatusBar from "@/components/StatusBar.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { onMounted } from "vue";
let href = ref("");
onLoad((option) => {
  if (option?.href) {
    href.value = option.href;
  }
});

onMounted(() => {
  // #ifdef APP-PLUS
  console.log("onMounted");
  const currentWebview = getCurrentPages()[0].$getAppWebview();
  console.log(currentWebview.children());
  // #endif
});

// setTimeout(() => {
//   var wv = currentWebview.children()[0];
//   wx.setStyle({
//     top: uni.getSystemInfoSync().statusBarHeight + 44,
//   });
// }, 1000);
</script>
