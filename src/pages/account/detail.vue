<template>
  <prstatus></prstatus>
  <up-navbar title="新增账号" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="form-box">
      <up-form
        labelPosition="left"
        :model="baseFormData"
        :rules="rules"
        ref="valiForm"
      >
        <up-form-item label="名称" prop="name" borderBottom>
          <up-input v-model="baseFormData.name"></up-input>
        </up-form-item>
        <up-form-item label="账号" prop="account" borderBottom>
          <up-input v-model="baseFormData.account"></up-input>
        </up-form-item>
        <up-form-item label="密码" prop="password" borderBottom>
          <up-input v-model="baseFormData.password"></up-input>
        </up-form-item>
        <up-form-item label="电话" prop="phone" borderBottom>
          <up-input v-model="baseFormData.phone"></up-input>
        </up-form-item>
        <up-form-item label="邮箱" prop="email" borderBottom>
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
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ACCOUNT_API } from "@/api/account";

const id = ref("");
onLoad((options: any) => {
  if (options.id) {
    id.value = options.id;
    getAccountDetail();
  }
});

// 获取账号详情
const getAccountDetail = () => {
  request(`${ACCOUNT_API.getAccountById}/${id.value}`, {
    method: "GET",
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0) {
        uni.showToast({
          title: errorMessage,
          duration: 500,
          icon: "none",
        });
        return;
      }
      baseFormData.name = data.name;
      baseFormData.account = data.account;
      baseFormData.password = data.password;
      baseFormData.phone = data.phone;
      baseFormData.email = data.email;
      baseFormData.remark = data.remark;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

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
    const userInfo = JSON.parse(uni.getStorageSync("userInfo"));
    request(ACCOUNT_API.saveAccount, {
      data: Object.assign({}, baseFormData, {
        userId: userInfo.id,
        id: id.value,
      }),
      method: "POST",
    }).then((res: any) => {
      loading.value = false;
      const { errorCode, message, data } = res;
      if (errorCode == 0) {
        uni.showToast({
          title: message,
          icon: "success",
          duration: 500,
          success: () => {
            back();
          },
        });
      } else {
        uni.showToast({
          title: message,
          icon: "none",
        });
      }
    });
  });
};
const back = () => {
  uni.redirectTo({
    url: "/pages/account/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  .form-box {
    padding: 0 24px;
    padding-top: 50px;

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
