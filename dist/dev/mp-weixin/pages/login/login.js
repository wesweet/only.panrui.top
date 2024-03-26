"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const formData = common_vendor.reactive({
      username: "wesweet",
      password: "Pr338535"
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
      }
    };
    const form = common_vendor.ref("");
    common_vendor.onReady(() => {
      form.value.setRules(rules);
    });
    const login = async () => {
      const valid = await form.value.validate();
      if (!valid) {
        return;
      }
    };
    const register = () => {
      common_vendor.index.navigateTo({
        url: "/pages/reg/reg"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.username = $event),
        b: common_vendor.p({
          trim: "all",
          placeholder: "请输入账号",
          modelValue: formData.username
        }),
        c: common_vendor.p({
          label: "账号",
          name: "username",
          required: true
        }),
        d: common_vendor.o(($event) => formData.password = $event),
        e: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.password
        }),
        f: common_vendor.p({
          label: "密码",
          name: "password",
          required: true
        }),
        g: common_vendor.sr(form, "cdfe2409-0", {
          "k": "form"
        }),
        h: common_vendor.p({
          rules,
          model: formData
        }),
        i: common_vendor.o(login),
        j: common_vendor.o(register)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"], ["__file", "D:/gitee/app-vue3-ts/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
