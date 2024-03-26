"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const api_app = require("../../api/app.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "test",
  setup(__props) {
    const uploadFile = () => {
      common_vendor.index.chooseImage({
        success: (res) => {
          let files = [];
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            files.push({
              name: "file" + i,
              uri: res.tempFilePaths[i]
            });
          }
          common_vendor.index.uploadFile({
            url: config_app.HTTP_REQUEST_URL + api_app.appApi.uploadFile,
            files,
            formData: {
              a: 1,
              b: 2
            },
            success: (res2) => {
              console.log(res2);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(uploadFile)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitee/app-vue3-ts/src/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
