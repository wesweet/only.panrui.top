"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "reg",
  setup(__props) {
    const formData = common_vendor.reactive({
      username: "",
      // 用户名
      password: "",
      // 密码
      mobile: "",
      // 手机号
      gender: "M"
      // 性别
    });
    const rules = {
      username: {
        rules: [
          { required: true, errorMessage: "请输入账号", trigger: "blur" },
          {
            minLength: 3,
            maxLength: 10,
            errorMessage: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ]
      },
      password: {
        rules: [
          { required: true, errorMessage: "请输入密码", trigger: "blur" },
          {
            minLength: 6,
            maxLength: 20,
            errorMessage: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      mobile: {
        rules: [
          { required: true, errorMessage: "请输入手机号", trigger: "blur" },
          {
            minLength: 11,
            maxLength: 11,
            errorMessage: "手机号格式不正确",
            trigger: "blur"
          }
        ]
      },
      gender: {
        rules: [{ required: true, errorMessage: "请选择性别", trigger: "change" }]
      }
    };
    const form = common_vendor.ref("");
    common_vendor.onReady(() => {
      form.value.setRules(rules);
    });
    const range = [
      { text: "男", value: "M" },
      { text: "女", value: "F" },
      { text: "未知", value: "U" }
    ];
    const change = (e) => {
      console.log(e);
    };
    const register = async () => {
      const valid = await form.value.validate();
      if (!valid) {
        return;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          shadow: true,
          dark: true,
          title: "注册"
        }),
        b: common_vendor.o(($event) => formData.username = $event),
        c: common_vendor.p({
          trim: "all",
          placeholder: "请输入账号",
          modelValue: formData.username
        }),
        d: common_vendor.p({
          label: "账号",
          name: "username",
          required: true
        }),
        e: common_vendor.o(($event) => formData.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.password
        }),
        g: common_vendor.p({
          label: "密码",
          name: "password",
          required: true
        }),
        h: common_vendor.o(($event) => formData.mobile = $event),
        i: common_vendor.p({
          trim: "all",
          placeholder: "请输入手机号",
          modelValue: formData.mobile
        }),
        j: common_vendor.p({
          label: "手机号",
          name: "mobile",
          required: true
        }),
        k: common_vendor.o(change),
        l: common_vendor.o(($event) => formData.gender = $event),
        m: common_vendor.p({
          localdata: range,
          modelValue: formData.gender
        }),
        n: common_vendor.p({
          label: "性别",
          name: "gender",
          required: true
        }),
        o: common_vendor.sr(form, "4dc59264-1", {
          "k": "form"
        }),
        p: common_vendor.p({
          rules,
          model: formData
        }),
        q: common_vendor.o(register)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4dc59264"], ["__file", "D:/gitee/app-vue3-ts/src/pages/reg/reg.vue"]]);
wx.createPage(MiniProgramPage);
