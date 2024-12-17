<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-17 16:56:35
 * @FilePath: \only.panrui.top\src\pages\login\login.vue
 * @Description: 登录页
-->
<template>
  <StatusBar></StatusBar>
  <view class="page-wrap">
    <view class="page-wrap__back" @click="back">
      <span class="iconfont icon-swap-left"></span>
    </view>

    <view class="page-wrap__logo">
      <up-image
        :show-loading="true"
        :src="logoImage"
        width="80px"
        height="80px"
      ></up-image>
    </view>

    <view class="page-wrap__form">
      <up-input
        placeholder="请输入账号"
        v-model="formData.username"
        :clearable="clearable"
      >
        <template #prefix>
          <span class="iconfont icon-mobile"></span>
        </template>
      </up-input>
      <up-input
        placeholder="请输入密码"
        type="password"
        v-model="formData.password"
        :clearable="clearable"
      >
        <template #prefix>
          <span class="iconfont icon-safetycertificate"></span>
        </template>
      </up-input>

      <up-text
        text="未注册的手机号会自动创建账号"
        align="center"
        color="#C8C8C8"
      ></up-text>

      <up-button
        text="登录"
        color="#020202"
        @click="submit"
        :loading="isRotate"
      ></up-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import StatusBar from "@/components/StatusBar.vue";
import { reactive, ref } from "vue";
import { route, toast } from "@/uni_modules/uview-plus";
import { login } from "@/common/api/login";

const logoImage = ref("/static/images/login.png");
// 是否加载loading
let isRotate = ref(false);
const clearable = true;
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

const submit = () => {
  if (
    !formData.username ||
    formData.username.length < 3 ||
    formData.username.length > 10
  ) {
    toast("用户名长度在3-10之间");
    return;
  }
  if (
    !formData.password ||
    formData.password.length < 6 ||
    formData.password.length > 20
  ) {
    toast("密码长度在6-20之间");
    return;
  }
  try {
    isRotate.value = true;
    login(formData)
      .then((res: any) => {
        const { errorCode, data, errorMessage } = res;
        if (errorCode != 0) {
          toast(errorMessage);
          return;
        }
        const { access_token, user } = data;
        uni.setStorageSync("token", access_token);
        uni.setStorageSync("userInfo", JSON.stringify(user));
        route({
          type: "switchTab",
          url: "/pages/tabBar/index",
        });
      })
      .catch((err: any) => {
        toast(err.errMsg);
      })
      .finally(() => {
        isRotate.value = false;
      });
  } catch (error) {}
};

const back = () => {
  // 关闭当前页面返回上一个面
  uni.navigateTo({
    url: "/pages/start/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 100vh;
  .page-wrap__back {
    display: flex;
    align-items: center;
    margin: 50px 0;
    height: 40px;
    box-sizing: border-box;
    padding: 0 20px;
    .iconfont {
      font-size: 40px;
    }
  }
  .page-wrap__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-wrap__form {
    box-sizing: border-box;
    margin-top: 100px;
    padding: 0 38px;
    ::v-deep .u-input {
      height: 55px;
      margin-bottom: 30px;
      background-color: #f5f5f5;
      border-radius: 100px;
      box-sizing: border-box;
      padding: 10px 15px !important;
      border: 1px solid #f5f5f5 !important;
      .uni-input-placeholder {
        color: #101010 !important;
        font-size: 15px;
      }
    }
    .iconfont {
      font-size: 28px;
    }
    ::v-deep .u-button {
      margin-top: 30px;
      height: 55px;
      border-radius: 100px;
      .u-button__text {
        font-size: 20px !important;
      }
    }
  }
}
</style>
