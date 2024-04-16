<template>
  <StatusBar></StatusBar>
  <uni-nav-bar left-icon="left" shadow dark title="小说板块" />
  <div class="web-view-container"></div>
</template>

<script>
// 导入 StatusBar
import StatusBar from "@/components/StatusBar.vue";
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
export default {
  components: {
    StatusBar,
  },
  setup() {
    const wv = ref(null); // 计划创建的 webview
    let href = ''
    onLoad((option) => {
      href = option.href
    })

    onMounted(() => {
      // #ifdef APP-PLUS
      wv.value = plus.webview.create("", "custom-webview", {
        plusrequire: "none", // 禁止远程网页使用 plus 的 API
        "uni-app": "none", // 不加载 uni-app 渲染层框架，避免样式冲突
        top: uni.getSystemInfoSync().statusBarHeight + 44, // 放置在 titleNView 下方
      });

      wv.value.loadURL(href);
      const currentWebview = getCurrentPages()[0].$getAppWebview();

      currentWebview.append(wv.value); // 一定要 append 到当前的页面里
      // #endif
    });
    return {
      wv,
    };
  },
};
</script>
<style lang="scss">
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
