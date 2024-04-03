"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const api_app = require("../../api/app.js");
require("../../config/app.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_notice_bar2 + _easycom_uni_card2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (StatusBar + _easycom_uni_notice_bar + _easycom_uni_card)();
}
const StatusBar = () => "../../components/StatusBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref("/static/20231016112713.jpg");
    const onClick = () => {
    };
    const calendarData = common_vendor.reactive({
      content: "",
      firstImage: "",
      typeName: ""
    });
    common_vendor.onLoad(() => {
      getCalendar();
    });
    const getCalendar = () => {
      utils_request.request(api_app.appApi.calendar, {
        method: "GET"
      }).then((res) => {
        const { errorCode, errorMessage, data } = res;
        if (errorCode == 0) {
          common_vendor.index.showToast({
            title: errorMessage,
            duration: 2e3,
            icon: "none"
          });
          if (data) {
            const info = data.data[0];
            calendarData.content = info.content;
            calendarData.firstImage = info.firstImage;
            calendarData.typeName = info.typeName;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    const previewImage = (photo) => {
      common_vendor.index.previewImage({
        current: photo,
        urls: [photo]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["is-shadow"]: "true",
          ["background-color"]: "#e60033",
          color: "#ffffff",
          ["show-icon"]: true,
          scrollable: true,
          text: "初心不负App正式发布了、欢迎大家下载体验、有问题请联系我(1547177202)、谢谢！"
        }),
        b: calendarData.firstImage,
        c: common_vendor.o(($event) => previewImage(calendarData.firstImage)),
        d: common_vendor.t(calendarData.typeName),
        e: common_vendor.o(onClick),
        f: common_vendor.p({
          title: calendarData.content
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/gitee/app-vue3-ts/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
