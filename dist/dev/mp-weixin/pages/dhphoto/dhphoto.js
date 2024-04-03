"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const api_app = require("../../api/app.js");
require("../../config/app.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (StatusBar + _easycom_uni_icons + _easycom_uni_card + _easycom_uni_section)();
}
const StatusBar = () => "../../components/StatusBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dhphoto",
  setup(__props) {
    const onClick = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/dhphoto/wander?id=" + id
      });
    };
    const addWander = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dhphoto/wander"
      });
    };
    const actionsClick = (value) => {
      console.log(value);
      common_vendor.index.showToast({
        title: "功能正在开发中",
        duration: 2e3
      });
    };
    const pagination = common_vendor.reactive({
      page: 1,
      limit: 10
    });
    let total = common_vendor.ref(0);
    const wanderList = common_vendor.ref([]);
    const getWanderList = () => {
      utils_request.request(api_app.appApi.getWanderList, {
        method: "GET",
        data: pagination
      }).then((res) => {
        const { errorCode, errorMessage, data } = res;
        if (errorCode == 0) {
          common_vendor.index.showToast({
            title: errorMessage,
            duration: 2e3
          });
          if (data) {
            wanderList.value = wanderList.value.concat(data.list);
            total.value = data.total;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    getWanderList();
    common_vendor.onPullDownRefresh(() => {
      pagination.page = 1;
      wanderList.value = [];
      getWanderList();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onReachBottom(() => {
      if (pagination.page * pagination.limit >= total.value) {
        common_vendor.index.showToast({
          title: "没有更多数据了",
          duration: 2e3
        });
        return;
      }
      pagination.page++;
      getWanderList();
    });
    const previewImage = (photo) => {
      common_vendor.index.previewImage({
        current: photo,
        urls: [photo]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(wanderList.value, (item, index, i0) => {
          return {
            a: item.photo,
            b: item.photo,
            c: common_vendor.o(($event) => previewImage(item.photo)),
            d: common_vendor.t(item.content),
            e: "741a3953-3-" + i0 + "," + ("741a3953-2-" + i0),
            f: "741a3953-4-" + i0 + "," + ("741a3953-2-" + i0),
            g: "741a3953-5-" + i0 + "," + ("741a3953-2-" + i0),
            h: common_vendor.o(($event) => onClick(item.id)),
            i: "741a3953-2-" + i0 + "," + ("741a3953-1-" + i0),
            j: "741a3953-1-" + i0,
            k: common_vendor.p({
              title: item.title + "(" + item.date + ")",
              type: "line"
            })
          };
        }),
        b: common_vendor.p({
          type: "redo",
          size: "18",
          color: "#999"
        }),
        c: common_vendor.o(($event) => actionsClick("分享")),
        d: common_vendor.p({
          type: "heart",
          size: "18",
          color: "#999"
        }),
        e: common_vendor.o(($event) => actionsClick("点赞")),
        f: common_vendor.p({
          type: "comment",
          size: "18",
          color: "#999"
        }),
        g: common_vendor.o(($event) => actionsClick("评论")),
        h: common_vendor.o(addWander)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitee/app-vue3-ts/src/pages/dhphoto/dhphoto.vue"]]);
wx.createPage(MiniProgramPage);
