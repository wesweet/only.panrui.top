<!--
 * @Description: 用户中心
 * @Author: panrui
 * @Date: 2023-05-25 16:11:02
 * @LastEditTime: 2024-04-17 09:46:15
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <!-- #ifdef H5 -->
  <uni-nav-bar shadow dark title="功能正在开发中" />
  <!-- #endif -->

  <!-- #ifdef APP-PLUS -->
  <view class="user">
    <view class="user-img"></view>
    <view class="user-info"></view>
  </view>
  <uni-list>
    <uni-list-item
      :show-extra-icon="true"
      showArrow
      link="navigateTo"
      to="/pages/wendang/wendang"
      title="文档"
    >
      <template v-slot:header>
        <image
          class="slot-image"
          src="/static/wendang.png"
          mode="aspectFill"
        ></image>
      </template>
    </uni-list-item>
    <uni-list-item
      :show-extra-icon="true"
      showArrow
      link="navigateTo"
      to="/pages/ditie/ditie"
      title="地铁"
    >
      <template v-slot:header>
        <image
          class="slot-image"
          src="/static/ditie.png"
          mode="aspectFill"
        ></image>
      </template>
    </uni-list-item>
    <uni-list-item
      :show-extra-icon="true"
      showArrow
      link="navigateTo"
      to="/pages/xiaoshuo/xiaoshuo"
      title="小说"
    >
      <template v-slot:header>
        <image
          class="slot-image"
          src="/static/dianzishu.png"
          mode="aspectFill"
        ></image>
      </template>
    </uni-list-item>
    <template v-if="isLogin">
      <uni-list-item
        :show-extra-icon="true"
        showArrow
        link="navigateTo"
        to="/pages/dhphoto/dhphoto"
        title="时光机"
      >
        <template v-slot:header>
          <image
            class="slot-image"
            src="/static/love.png"
            mode="aspectFill"
          ></image>
        </template>
      </uni-list-item>
      <uni-list-item
        :show-extra-icon="true"
        showArrow
        :extra-icon="extraIcon"
        clickable
        @click="logout"
        title="退出"
      />
    </template>
    <template v-else>
      <uni-list-item
        :show-extra-icon="true"
        showArrow
        :extra-icon="extraIcon"
        link="navigateTo"
        to="/pages/login/login"
        title="登录"
      />
    </template>
  </uni-list>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { onReady, onShow } from "@dcloudio/uni-app";
// import { fetchUserInfo } from "@/api/app";
import StatusBar from "@/components/StatusBar.vue";

const extraIcon = reactive({
  color: "#4cd964",
  size: "22",
  type: "gear-filled",
});

// 定义登录状态
const isLogin = ref(false);

// const list = reactive([

// ]);

// const change = (e: any) => {
//   const page = list[e.detail.index].page;
//   if (!page) {
//     uni.showToast({
//       title: "功能正在开发中",
//       duration: 2000,
//     });
//   } else {
//     uni.navigateTo({
//       url: page,
//     });
//   }
// };

onShow(() => {
  // 获取token
  const token = uni.getStorageSync("token");
  if (token) {
    isLogin.value = true;
  }
  // 从本地缓存中获取userId
  // const userId = uni.getStorageSync("userId");
  // 如果userId不存在,则跳转到登录页面
  // if (!userId) {
  //   // 清空缓存
  //   uni.clearStorageSync();
  //   // uni.redirectTo({
  //   //   url: "/pages/login/login",
  //   // });
  //   return;
  // }
  // // 获取用户信息
  // fetchUserInfo({ id: userId }).then((res: any) => {
  //   if (res.errorCode === 0) {
  //     // 将用户信息存储到本地缓存中
  //     uni.setStorageSync("userInfo", res.data);
  //   }
  // });
});

// 退出登录
const logout = () => {
  uni.clearStorageSync();
  isLogin.value = false;
};
</script>

<style lang="scss" scoped>
.user {
  background-color: #333333;
  min-height: 10rem;
}
.slot-image {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>
