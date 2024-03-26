"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const config_app = require("../../config/app.js");
const api_app = require("../../api/app.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "wander",
  setup(__props) {
    const baseFormData = common_vendor.reactive({
      title: "",
      date: "",
      content: ""
    });
    const rules = common_vendor.reactive({
      title: {
        rules: [{ required: true, errorMessage: "请输入标题" }]
      },
      date: {
        rules: [{ required: true, errorMessage: "请选择日期" }]
      },
      content: {
        rules: [{ required: true, errorMessage: "请输入内容" }]
      }
    });
    const loading = common_vendor.ref(false);
    const maskClick = () => {
    };
    const id = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      if (options.id) {
        id.value = options.id;
        getWanderDetail();
      }
    });
    const getWanderDetail = () => {
      utils_request.request(api_app.appApi.getWanderDetail, {
        method: "GET",
        data: {
          id: id.value
        }
      }).then((res) => {
        const { errorCode, errorMessage, data } = res;
        if (errorCode == 0) {
          common_vendor.index.showToast({
            title: errorMessage,
            duration: 2e3,
            icon: "none"
          });
          if (data) {
            baseFormData.title = data.title;
            baseFormData.date = data.date;
            baseFormData.content = data.content;
            if (data.photo) {
              imageList.push({
                name: "image",
                uri: data.photo
              });
            }
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    const imageList = common_vendor.reactive([]);
    const uploadFile = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
            imageList.push({
              name: uniqueSuffix,
              uri: res.tempFilePaths[i]
            });
          }
        }
      });
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        // 当前显示图片的URL
        current: imageList[index].uri,
        // 图片的URL数组
        urls: imageList.map((item) => item.uri)
      });
    };
    const deleteImage = (index) => {
      imageList.splice(index, 1);
    };
    const valiForm = common_vendor.ref(null);
    const onSubmit = () => {
      valiForm.value.validate().then((res) => {
        if (id.value) {
          res.id = id.value;
        }
        loading.value = true;
        common_vendor.index.uploadFile({
          // 请求的url
          url: config_app.HTTP_REQUEST_URL + api_app.appApi.addWander,
          // 文件的路径
          files: imageList,
          // 文件上传的formData数据
          formData: res,
          // 文件上传成功回调函数
          success(result) {
            loading.value = false;
            const data = JSON.parse(result.data);
            const { errorCode, message } = data;
            if (errorCode == 0) {
              common_vendor.index.showToast({
                title: message,
                icon: "success",
                duration: 1500,
                // 成功提示框关闭后的回调函数
                success() {
                  common_vendor.index.navigateTo({
                    url: "/pages/dhphoto/dhphoto"
                  });
                }
              });
            }
          },
          // 文件上传失败回调函数
          fail(err) {
            loading.value = false;
            console.log(err);
          }
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => baseFormData.title = $event),
        b: common_vendor.p({
          placeholder: "请输入标题",
          modelValue: baseFormData.title
        }),
        c: common_vendor.p({
          label: "标题",
          name: "title"
        }),
        d: common_vendor.o(maskClick),
        e: common_vendor.o(($event) => baseFormData.date = $event),
        f: common_vendor.p({
          type: "date",
          ["clear-icon"]: false,
          modelValue: baseFormData.date
        }),
        g: common_vendor.p({
          label: "日期",
          name: "date"
        }),
        h: common_vendor.f(imageList, (item, index, i0) => {
          return {
            a: item.uri,
            b: common_vendor.o(($event) => previewImage(index), index),
            c: common_vendor.o(($event) => deleteImage(index), index),
            d: index,
            e: index
          };
        }),
        i: imageList.length < 1,
        j: common_vendor.o(uploadFile),
        k: common_vendor.p({
          label: "图片",
          name: "photo"
        }),
        l: common_vendor.o(($event) => baseFormData.content = $event),
        m: common_vendor.p({
          placeholder: "请输入内容",
          type: "textarea",
          rows: 10,
          maxlength: "500",
          modelValue: baseFormData.content
        }),
        n: common_vendor.p({
          label: "内容",
          name: "content"
        }),
        o: common_vendor.sr(valiForm, "d524397b-0", {
          "k": "valiForm"
        }),
        p: common_vendor.p({
          rules,
          modelValue: baseFormData,
          ["label-position"]: "top"
        }),
        q: common_vendor.o(onSubmit),
        r: loading.value,
        s: loading.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d524397b"], ["__file", "D:/gitee/app-vue3-ts/src/pages/dhphoto/wander.vue"]]);
wx.createPage(MiniProgramPage);
