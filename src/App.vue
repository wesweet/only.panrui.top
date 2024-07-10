<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-10 09:09:10
 * @FilePath: \only.panrui.top\src\App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { GEO_URL, MAP_KEY, METRO_KEY } from "@/config/app";
onLaunch(() => {
  const app = getApp({ allowDefault: true });
  app.globalData = {
    geoUrl: GEO_URL,
    key: MAP_KEY,
    metrokey: METRO_KEY,
  };
});
onShow(() => {});
onHide(() => {});
</script>

<style lang="scss">
@import "@/uni_modules/uview-plus/index.scss";
@import "@/static/css/iconfont.css";
</style>
