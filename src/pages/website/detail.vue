<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-23 13:49:31
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-23 14:12:49
 * @FilePath: \only.panrui.top\src\pages\website\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="新增网站" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="form-box">
      <up-form
        labelPosition="left"
        :model="baseFormData"
        :rules="rules"
        ref="valiForm"
      >
        <up-form-item label="网站名称" prop="name" borderBottom>
          <up-input v-model="baseFormData.name"></up-input>
        </up-form-item>
        <up-form-item label="网站地址" prop="account" borderBottom>
          <up-input v-model="baseFormData.account"></up-input>
        </up-form-item>
        <up-form-item label="网站描述" prop="password" borderBottom>
          <up-input v-model="baseFormData.password"></up-input>
        </up-form-item>
        <up-form-item label="网站关键字" prop="phone" borderBottom>
          <up-textarea v-model="baseFormData.phone"></up-textarea>
        </up-form-item>
        <up-form-item label="网站图标" prop="email" borderBottom>
          <up-input v-model="baseFormData.email"></up-input>
        </up-form-item>
        <up-form-item label="备注" prop="remark" borderBottom>
          <up-textarea v-model="baseFormData.remark"></up-textarea>
        </up-form-item>
      </up-form>

      <view class="btn-box">
        <up-button
          :loading="loading"
          loadingText="加载中"
          class="primary-btn"
          text="提交"
          @click="onSubmit"
        ></up-button>
      </view>
    </view>

    <up-picker :show="tagShow" :columns="tagColumns" keyName="name"></up-picker>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { onLoad, onShow } from "@dcloudio/uni-app";
/**
 * 定义基础表单数据类型
 */
interface BaseFormData {
  name: string;
  account: string;
  password: string;
  phone: string;
  email: string;
  remark: string;
}

/**
 * 基础表单数据
 */
const baseFormData: BaseFormData = reactive({
  name: "",
  account: "",
  password: "",
  phone: "",
  email: "",
  remark: "",
});

/**
 * 定义表单验证规则
 */
const rules = reactive({
  name: {
    type: "string",
    required: true,
    message: "名称不能为空",
    trigger: ["blur", "change"],
  },
  account: {
    type: "string",
    required: true,
    message: "账号不能为空",
    trigger: ["blur", "change"],
  },
  password: {
    type: "string",
    required: true,
    message: "密码不能为空",
    trigger: ["blur", "change"],
  },
});

/**
 * 控制加载状态的ref
 */
const loading = ref(false);

/**
 * 表单验证实例ref
 */
const valiForm = ref<any>(null);

/**
 * 提交表单
 */
const onSubmit = () => {
  valiForm.value.validate().then((res: any) => {
    if (!res) {
      return;
    }
    loading.value = true;
  });
};
const back = () => {
  uni.redirectTo({
    url: "/pages/account/index",
  });
};

const tagShow = ref(false);

const tagColumns = ref([]);
</script>

<style lang="scss" scoped>
.page-wrap {
  .form-box {
    padding: 0 24px;
    /* #ifdef H5 */
    padding-top: 50px;
    /* #endif */

    .up-form-item__content {
      display: flex;
      align-items: center;
      height: 26px;
      width: 100%;
      border: 1px solid #dadbde;
      border-radius: 5px;
      padding: 6px;
      box-sizing: border-box;
    }

    ::v-deep .u-form-item__body__left__content__label {
      color: #0a0a0a;
      font-size: 18px;
      font-weight: bold;
    }
    ::v-deep .u-border {
      border: 1px solid #71717a;
    }
  }
}
.btn-box {
  // width: 100px;
  margin-top: 30px;
}
.primary-btn {
  background-color: #181818;
  color: #fff;
}
</style>
