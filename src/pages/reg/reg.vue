<template>
  <!-- 创建一个表单 -->
  <view>
    <uni-forms ref="form" class="uni-forms">
      <uni-forms-item label="账号" name="">
        <uni-easyinput
          class="uni-mt-5"
          trim="all"
          v-model="formData.username"
          placeholder="请输入内容"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="密码" name="">
        <uni-easyinput
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="性别" name="">
        <uni-data-checbox
          v-model="formData.sex"
          :localdata="sex"
        ></uni-data-checbox>
      </uni-forms-item>
      <!-- 生成手机号码输入框 -->
      <uni-forms-item label="手机号码" name="">
        <uni-easyinput
          type="number"
          v-model="formData.phone"
          placeholder="请输入手机号码"
        ></uni-easyinput>
      </uni-forms-item>
      <!-- 创建一个注册按钮 -->
      <button @click="reg">注册</button>
    </uni-forms>
  </view>
</template>

<script lang="ts" setup>
// 添加注册方法
import { reactive } from "vue";
import { fetchRegister } from "@/api/app";
// 定义表单
const formData = reactive({
  username: "",
  password: "",
  sex: "",
  phone: "",
});
// 定义sex数组，用于生成性别选择器，包含男女和未知
const sex = [
  {
    label: "男",
    value: "1",
  },
  {
    label: "女",
    value: "2",
  },
  {
    label: "未知",
    value: "0",
  },
];
const reg = () => {
  fetchRegister(formData).then((res: any) => {
    console.log(res);
    // 获取到返回值后，判断是否注册成功，成功则跳转到登录页，失败则提示错误信息，不跳转，继续停留在注册页，等待用户重新输入，直到注册成功为止，
    // 为了方便，这里直接跳转到登录页
    if (res.code === 200) {
      uni.switchTab({
        url: "/pages/login/login",
      });
    } else {
      uni.showToast({
        title: res.msg,
        icon: "none",
      });
    }
  });
};
</script>

<style></style>
