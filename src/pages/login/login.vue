<template>
  <uni-forms ref="form" class="uni-forms" :rules="rules" :model="formData">
    <uni-forms-item label="账号" name="username" required>
      <uni-easyinput
        class="uni-mt-5"
        trim="all"
        v-model="formData.username"
        placeholder="请输入内容"
      ></uni-easyinput>
    </uni-forms-item>
    <uni-forms-item label="密码" name="password" required>
      <uni-easyinput
        type="password"
        v-model="formData.password"
        placeholder="请输入密码"
      ></uni-easyinput>
    </uni-forms-item>
  </uni-forms>
  <view class="uni-flex uni-flex-pack-around">
    <button @click="login">登录</button>
    <button @click="register">注册</button>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { fetchLogin } from "@/api/app";
import { onReady } from "@dcloudio/uni-app";
// 定义接口
interface IFormData {
  username: string;
  password: string;
}
// 使用定义的接口创建一个响应式对象
const formData: IFormData = reactive({
  username: "",
  password: "",
});
// 定义表单校验规则
const rules = {
  username: {
    rules: [
      { required: true, errorMessage: "请输入账号", trigger: "blur" },
      {
        minLength: 3,
        maxLength: 10,
        errorMessage: "长度在 3 到 10 个字符",
        trigger: "blur",
      },
    ],
  },
  password: {
    rules: [
      { required: true, errorMessage: "请输入密码", trigger: "blur" },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "长度在 6 到 20 个字符",
        trigger: "blur",
      },
    ],
  },
};
// 获取表单实例
const form = ref<any>("");
// 在onready生命周期中设置规则
onReady(() => {
  form.value.setRules(rules);
});
// 点击登录事情,对表单进行校验
const login = () => {
  form.value.validate().then((res: any) => {
    if (res) {
      fetchLogin(formData).then((res: any) => {
        if (res.errorCode === 0) {
          uni.setStorageSync("token", res.data.token);
          uni.switchTab({
            url: "/pages/index/index",
          });
        } else {
          uni.showToast({
            title: res.errorMessage,
            icon: "none",
          });
        }
      });
    } else {
      uni.showToast({
        title: "请填写完整",
        icon: "none",
      });
      return false;
    }
  });
};

// 点击注册事情
const register = () => {
  uni.navigateTo({
    url: "/pages/reg/reg",
  });
};
</script>

<style lang="scss" scoped>
.uni-forms {
  padding: 100rpx 50rpx 0;
}
.uni-flex {
  display: flex;
}
.uni-flex-pack-around {
  margin-top: 50rpx;
  justify-content: space-around;
}
</style>