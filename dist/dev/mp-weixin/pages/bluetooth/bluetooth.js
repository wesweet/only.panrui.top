"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_nav_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (StatusBar + _easycom_uni_nav_bar + _easycom_uni_list_item + _easycom_uni_list)();
}
const StatusBar = () => "../../components/StatusBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "bluetooth",
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          shadow: true,
          dark: true,
          title: "蓝牙测试"
        }),
        b: common_vendor.f(_ctx.list, (item, index, i0) => {
          return {
            a: index,
            b: "35f74393-3-" + i0 + ",35f74393-2",
            c: common_vendor.p({
              title: item.name,
              index
            })
          };
        }),
        c: _ctx.isInitBluetooth
      }, _ctx.isInitBluetooth ? {
        d: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.getBluetoothDevices && _ctx.getBluetoothDevices(...args)
        )
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitee/app-vue3-ts/src/pages/bluetooth/bluetooth.vue"]]);
wx.createPage(MiniProgramPage);
