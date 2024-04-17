<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
//   console.log("App Launch");
  const app = getApp({ allowDefault: true });
  app.globalData = {
    geoUrl: "https://restapi.amap.com/v3", // 高德地图接口服务路径
    key: "eef520430048905703a89eef94f73d23", // 高德地图web_key
    metrokey: "2676091421668dc3a8b7534e5cc3b502", //高德地铁 key
  };
});
onShow(() => {
  // console.log("App Show");
  // 判断本地缓存是否存在token: 不存在则跳转到登录页
  // if (!uni.getStorageSync("token")) {
  //   uni.redirectTo({ url: "/pages/login/login" });
  // }
});
onHide(() => {
  // console.log("App Hide");
});
</script>