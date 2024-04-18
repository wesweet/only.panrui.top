<template>
  <StatusBar></StatusBar>
  <view class="login">
    <view class="content">
      <view class="header">
        <image :src="logoImage"></image>
      </view>
      <view class="main">
        <prinput placeholder="请输入账号" v-model="formData.username"></prinput>
        <prinput placeholder="请输入密码" v-model="formData.password"></prinput>
      </view>
      <prbutton
        text="登 录"
        :rotate="isRotate"
        class="prbutton"
        @click="login"
      ></prbutton>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { appApi } from "@/api/app";
import StatusBar from "@/components/StatusBar.vue";
import { request } from "@/utils/request";
import { reactive, ref } from "vue";

const logoImage = ref("/static/login.png");
let isRotate = ref(false); // 是否加载loading
// import { request } from "@/utils/request";
// import { appApi } from "@/api/app";
// import { onReady } from "@dcloudio/uni-app";
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
// // 定义表单校验规则
// const rules = {
//   username: {
//     rules: [
//       { required: true, errorMessage: "请输入账号", trigger: "blur" },
//       {
//         minLength: 3,
//         maxLength: 10,
//         errorMessage: "长度在 3 到 10 个字符",
//         trigger: "blur",
//       },
//     ],
//   },
//   password: {
//     rules: [
//       { required: true, errorMessage: "请输入密码", trigger: "blur" },
//       {
//         minLength: 6,
//         maxLength: 20,
//         errorMessage: "长度在 6 到 20 个字符",
//         trigger: "blur",
//       },
//     ],
//   },
// };
// // 获取表单实例
// const form = ref<any>("");
// // 在onready生命周期中设置规则
// onReady(() => {
//   form.value.setRules(rules);
// });
// 点击登录事情,对表单进行校验
const login = () => {
  if (
    !formData.username ||
    formData.username.length < 3 ||
    formData.username.length > 10
  ) {
    uni.showToast({
      title: "用户名长度在3-10之间",
      icon: "none",
      duration: 2000,
    });
    return;
  }
  if (
    !formData.password ||
    formData.password.length < 6 ||
    formData.password.length > 20
  ) {
    uni.showToast({
      title: "密码长度在6-20之间",
      icon: "none",
      duration: 2000,
    });
    return;
  }

  request(appApi.login, {
    data: formData,
    method: "POST",
  }).then((res: any) => {
    if (res.errorCode == 0) {
      uni.setStorageSync("token", res.data.access_token);
      uni.setStorageSync("userId", res.data.userId);
      back();
    } else {
      uni.showToast({
        title: res.errorMessage,
        icon: "none",
      });
    }
  });
};

const back = () => {
  // 关闭当前页面返回上一个面
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    width: 161rpx;
    height: 161rpx;
    box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    background-color: #000000;
    margin-top: 128rpx;
    margin-bottom: 72rpx;
    margin-left: auto;
    margin-right: auto;
    image {
      width: 161rpx;
      height: 161rpx;
      border-radius: 50%;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    padding-left: 70rpx;
    padding-right: 70rpx;
  }
  .prbutton {
    margin-top: 96rpx;
  }
}
</style>
