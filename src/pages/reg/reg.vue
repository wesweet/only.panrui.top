<!--
 * @Description: 
 * @Author: panrui
 * @Date: 2023-05-30 15:00:57
 * @LastEditTime: 2023-11-08 22:55:33
 * @LastEditors: panrui
 * 不忘初心,不负梦想
-->
<template>
  <!-- 创建一个表单 -->
  <view class="box">
    <uni-nav-bar shadow dark title="注册" />
    <uni-forms ref="form" class="uni-forms" :rules="rules" :model="formData">
      <uni-forms-item label="账号" name="username" required>
        <uni-easyinput
          class="uni-mt-5"
          trim="all"
          v-model="formData.username"
          placeholder="请输入账号"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="密码" name="password" required>
        <uni-easyinput
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
        ></uni-easyinput>
      </uni-forms-item>
      <!-- 手机号 -->
      <uni-forms-item label="手机号" name="mobile" required>
        <uni-easyinput
          class="uni-mt-5"
          trim="all"
          v-model="formData.mobile"
          placeholder="请输入手机号"
        ></uni-easyinput>
      </uni-forms-item>
      <!-- 性别 -->
      <uni-forms-item label="性别" name="gender" required>
        <uni-data-checkbox
          v-model="formData.gender"
          :localdata="range"
          @change="change"
        ></uni-data-checkbox>
      </uni-forms-item>
    </uni-forms>
    <view class="uni-flex uni-flex-pack-around">
      <button size="mini" @click="register">注册</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import StatusBar from "@/components/StatusBar.vue";
import { reactive, ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
// 定义接口
interface IFormData {
  username: string;
  password: string;
  mobile: string;
  gender: string;
}
// 使用定义的接口创建一个响应式对象
const formData: IFormData = reactive({
  username: "", // 用户名
  password: "", // 密码
  mobile: "", // 手机号
  gender: "M", // 性别
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
  mobile: {
    rules: [
      { required: true, errorMessage: "请输入手机号", trigger: "blur" },
      {
        minLength: 11,
        maxLength: 11,
        errorMessage: "手机号格式不正确",
        trigger: "blur",
      },
    ],
  },
  gender: {
    rules: [{ required: true, errorMessage: "请选择性别", trigger: "change" }],
  },
};

// 创建一个表单的引用
const form = ref<any>("");
onReady(() => {
  // 将表单的引用赋值给 ref
  form.value.setRules(rules);
});

// 定义性别的选项
const range = [
  { text: "男", value: "M" },
  { text: "女", value: "F" },
  { text: "未知", value: "U" },
];

// 定义一个方法，用于监听性别的变化
const change = (e: any) => {
  console.log(e);
};

// 定义一个方法，用于注册
const register = async () => {
  // 校验表单
  const valid = await form.value.validate();
  if (!valid) {
    return;
  }
  // 发送请求
  // const res = await fetchRegister(
  //   Object.assign({}, formData, { register_channel: "uniapp" })
  // );
  // if (res.errorCode === 0) {
  //   uni.showToast({
  //     title: "注册成功",
  //     icon: "success",
  //   });
  //   // 跳转到登录页面
  //   uni.navigateTo({
  //     url: "/pages/login/login",
  //   });
  // } else {
  //   uni.showToast({
  //     title: res.errorMessage,
  //     icon: "none",
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  background-color: #f0f0f4;
  .uni-forms {
    margin-top: 20px;
    padding: 0 50rpx;
  }
  .uni-forms-item {
    margin-bottom: 20px;
  }
  .uni-flex {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
