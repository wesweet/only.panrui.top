"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_title2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (StatusBar + _easycom_uni_title + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list)();
}
const StatusBar = () => "../../components/StatusBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const list = common_vendor.reactive([
      {
        text: "调用蓝牙",
        url: "/static/ditie.png",
        page: "/pages/bluetooth/bluetooth"
      },
      {
        text: "调用摄像头",
        url: "/static/wzry.jpg"
      },
      {
        text: "调用位置",
        url: "/static/dianzishu.png"
      },
      {
        text: "播放视频",
        url: "/static/gouwu-2.png"
      },
      {
        text: "文档指南",
        url: "/static/wendang.png",
        page: "/pages/wendang/wendang"
      },
      {
        text: "chatgpt",
        url: "/static/chat.png",
        page: "/pages/chatgpt/chatgpt"
      },
      {
        text: "游玩指南",
        url: "/static/mieba.png"
      },
      {
        text: "工作指南",
        url: "/static/mieba.png"
      },
      {
        text: "租房指南",
        url: "/static/mieba.png"
      }
    ]);
    const change = (e) => {
      const page = list[e.detail.index].page;
      if (!page) {
        common_vendor.index.showToast({
          title: "功能正在开发中",
          duration: 2e3
        });
      } else {
        common_vendor.index.navigateTo({
          url: page
        });
      }
    };
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "h3",
          title: "功能测试",
          color: "#d7003a"
        }),
        b: common_vendor.f(list, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.text),
            c: index,
            d: "99b0ba47-3-" + i0 + ",99b0ba47-2",
            e: common_vendor.p({
              index
            })
          };
        }),
        c: common_vendor.o(change),
        d: common_vendor.p({
          column: 3,
          square: false,
          highlight: false
        }),
        e: common_vendor.p({
          type: "h3",
          title: "我的消息",
          color: "#d7003a"
        }),
        f: common_vendor.f(list, (item, index, i0) => {
          return {
            a: index,
            b: "99b0ba47-6-" + i0 + ",99b0ba47-5",
            c: common_vendor.p({
              index,
              title: item.text,
              thumb: item.url
            })
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99b0ba47"], ["__file", "D:/gitee/app-vue3-ts/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
