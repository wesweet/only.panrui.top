"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_nav_bar2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (StatusBar + _easycom_uni_nav_bar + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const StatusBar = () => "../../components/StatusBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "treasure",
  setup(__props) {
    const list = common_vendor.reactive([
      {
        text: "地铁",
        url: "/static/ditie.png",
        page: "/pages/ditie/ditie"
      },
      {
        text: "王者",
        url: "/static/wzry.jpg"
      },
      {
        text: "小说",
        url: "/static/dianzishu.png"
      },
      {
        text: "购物",
        url: "/static/gouwu-2.png"
      },
      {
        text: "瑞瑞和叮叮的流浪日记",
        url: "/static/love.png",
        page: "/pages/dhphoto/dhphoto"
      },
      {
        text: "文档",
        url: "/static/wendang.png",
        page: "/pages/wendang/wendang"
      },
      {
        text: "chatgpt",
        url: "/static/chat.png",
        page: "/pages/chatgpt/chatgpt"
      },
      {
        text: "功能测试",
        url: "/static/mieba.png",
        page: "/pages/test/test"
      },
      {
        text: "电影",
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          shadow: true,
          dark: true,
          title: "百宝箱"
        }),
        b: common_vendor.f(list, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.text),
            c: index,
            d: "7d0f78d6-3-" + i0 + ",7d0f78d6-2",
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
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitee/app-vue3-ts/src/pages/treasure/treasure.vue"]]);
wx.createPage(MiniProgramPage);
