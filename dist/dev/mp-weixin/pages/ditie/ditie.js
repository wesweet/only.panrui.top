"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ditie",
  setup(__props) {
    const app = getApp();
    console.log(app.globalData);
    const fullscreen = common_vendor.ref(true);
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          shadow: true,
          dark: true,
          title: "地铁线路图"
        }),
        b: fullscreen.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a09347e"], ["__file", "D:/gitee/app-vue3-ts/src/pages/ditie/ditie.vue"]]);
wx.createPage(MiniProgramPage);
