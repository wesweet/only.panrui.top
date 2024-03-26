"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/user.js";
  "./pages/login/login.js";
  "./pages/treasure/treasure.js";
  "./pages/ditie/ditie.js";
  "./pages/dianzishu/dianzishu.js";
  "./pages/wendang/wendang.js";
  "./pages/gouwu/gouwu.js";
  "./pages/chatgpt/chatgpt.js";
  "./pages/reg/reg.js";
  "./pages/bluetooth/bluetooth.js";
  "./pages/dhphoto/dhphoto.js";
  "./pages/dhphoto/wander.js";
  "./pages/test/test.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      const app = getApp({ allowDefault: true });
      app.globalData = {
        geoUrl: "https://restapi.amap.com/v3",
        // 高德地图接口服务路径
        key: "eef520430048905703a89eef94f73d23",
        // 高德地图web_key
        metrokey: "2676091421668dc3a8b7534e5cc3b502"
        //高德地铁 key
      };
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitee/app-vue3-ts/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
