<!--
 * @Description: 用户中心
 * @Author: prui
 * @Date: 2024-04-17 13:49:47
 * @LastEditTime: 2024-04-18 09:53:20
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view class="page">
    <prstatus></prstatus>
    <view class="center">
      <view class="center_top">
        <view class="mask"></view>
      </view>
      <view class="center_box_bg">
        <view class="profily">
          <view class="base">
            <view class="profily_header"> </view>
            <text>编号9527</text>
            <image class="profily_setting" :src="time" mode=""></image>
          </view>
        </view>
        <view style="height: 300rpx"></view>
        <uni-list :border="false">
          <template v-if="isLogin">
            <uni-list-item
              :border="false"
              :show-extra-icon="true"
              showArrow
              clickable
              @click="logout"
              title="退出"
            >
              <template v-slot:header>
                <image
                  class="slot-image"
                  :src="setting"
                  mode="aspectFill"
                ></image>
              </template>
            </uni-list-item>
          </template>
          <template v-else>
            <uni-list-item
              :border="false"
              :show-extra-icon="true"
              showArrow
              link="navigateTo"
              to="/pages/login/login"
              title="登录"
            >
              <template v-slot:header>
                <image
                  class="slot-image"
                  :src="setting"
                  mode="aspectFill"
                ></image>
              </template>
            </uni-list-item>
          </template>
        </uni-list>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

const setting = ref("/static/setting.png");
const time = ref("/static/time.png");
// 定义登录状态
const isLogin = ref(false);
// 退出登录
const logout = () => {
  uni.clearStorageSync();
  isLogin.value = false;
};
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
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .center {
    flex: 1;
    .center_top {
      height: 18%;
      background: url("@/static/fengjing1.jpg") no-repeat 0% 50%;
      background-size: cover;
    }
  }
  .center_box_bg {
    position: relative;
    .profily {
      position: absolute;
      width: 90%;
      margin: 0 auto;
      left: 5%;
      top: -100rpx;
      border-radius: 16rpx;
      background: #fefefe;
      padding: 34rpx;
      box-sizing: border-box;
      box-shadow: 0px 2px 5px #ededed;
      .base {
        display: flex;
        align-items: center;
        position: relative;
        .profily_header {
          height: 120rpx;
          width: 120rpx;
          background-image: url("@/static/Airplane.png");
          background-size: 100%;
        }

        text {
          margin-left: 20px;
          font-size: 30upx;
        }

        image {
          position: absolute;
          height: 40upx;
          width: 40upx;
          right: 0px;
          top: 0px;
        }
      }
    }
  }
}
.slot-image {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.uni-list--border-top {
  display: none;
}
</style>
