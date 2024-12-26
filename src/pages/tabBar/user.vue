<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:58
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-12-26 23:17:28
 * @FilePath: \only.panrui.top\src\pages\tabBar\user.vue
 * @Description: 个人中心页
-->
<template>
  <up-navbar
    title=""
    leftIcon=""
    :autoBack="false"
    :placeholder="true"
  ></up-navbar>
  <view class="page-wrap">
    <view class="page-wrap__top"></view>
    <view class="page-wrap__content"></view>
    <view class="page-wrap__content"></view>
    <view class="page-wrap__content"></view>
    <view class="page-wrap__btn">
      <up-button text="退出登录" @click="handleLogout"></up-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUserInfo, logout } from "@/common/api/login";
import { reactive } from "vue";
import { route, toast } from "@/uni_modules/uview-plus";

const userInfo = reactive({
  nickname: "",
  avatar: "",
  username: "",
});

const data = uni.getStorageSync("userInfo");
if (data) {
  const id = JSON.parse(data).id;
  getUserInfo({
    params: { id },
  }).then((res: any) => {
    const { errorCode, data, errorMessage } = res;
    if (errorCode != 0) {
      toast(errorMessage);
      return;
    }
    userInfo.nickname = data.nickname;
    userInfo.avatar = data.avatar;
    userInfo.username = data.username;
  });
}

/**
 * 退出登录
 * 后期需要在服务端维护一个黑名单，避免这样token被滥用
 */
const handleLogout = () => {
  uni.removeStorageSync("token");
  uni.removeStorageSync("userInfo");
  route({
    type: "reLaunch",
    url: "/pages/login/login",
  });
  // logout({}).then((res: any) => {
  //   const { errorCode, errorMessage } = res;
  //   if (errorCode != 0) {
  //     toast(errorMessage);
  //     return;
  //   }
  // });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  background-color: #eee;
  .page-wrap__top {
    height: 168px;
    background-color: #000;
  }
}
</style>
