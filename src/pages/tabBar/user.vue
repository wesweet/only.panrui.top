<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:58
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-27 14:25:05
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
    <view class="page-wrap__top">
      <view class="page-wrap__avatar">
        <up-image
          :show-loading="true"
          :src="userInfo.avatar"
          width="80px"
          height="80px"
          shape="circle"
        ></up-image>
      </view>
      <view class="page-wrap__name">
        <up-text :text="userInfo.nickname" size="18" color="#fff"></up-text>
        <up-text :text="userInfo.username" size="12" color="#fff"></up-text>
      </view>
    </view>
    <view class="page-wrap__topFloat"></view>
    <view class="page-wrap__content">
      <up-cell-group :border="false">
        <up-cell title="账号安全"></up-cell>
        <up-cell icon="setting-fill" title="账户设置" :isLink="true"></up-cell>
        <up-cell icon="integral-fill" title="隐私设置" :isLink="true"></up-cell>
        <up-cell icon="integral-fill" title="安全中心" :isLink="true"></up-cell>
      </up-cell-group>
    </view>
    <view class="page-wrap__content">
      <up-cell-group :border="false">
        <up-cell title="常用功能"></up-cell>
        <up-cell icon="setting-fill" title="旅行日记" :isLink="true" url="/pages/travel/index"></up-cell>
        <up-cell icon="integral-fill" title="收藏夹" :isLink="true"></up-cell>
        <up-cell icon="integral-fill" title="浏览历史" :isLink="true"></up-cell>
      </up-cell-group>
    </view>
    <view class="page-wrap__content">
      <up-cell-group :border="false">
        <up-cell title="帮助支持"></up-cell>
        <up-cell icon="setting-fill" title="帮助中心" :isLink="true"></up-cell>
        <up-cell icon="integral-fill" title="联系客服" :isLink="true"></up-cell>
        <up-cell icon="integral-fill" title="关于我们" :isLink="true"></up-cell>
      </up-cell-group>
    </view>
    <view class="page-wrap__btn">
      <up-button
        text="退出登录"
        @click="handleLogout"
        color="#EF4444"
        :plain="true"
      ></up-button>
      <up-text
        text="版本号：1.2.1"
        align="center"
        size="12"
        color="#9CA3AF"
      ></up-text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getUserInfo, logout } from "@/common/api/login";
import { reactive } from "vue";
import { route, toast } from "@/uni_modules/uview-plus";
import config from "@/common/config";

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
    userInfo.nickname = data.nickname || "编号9527";
    userInfo.avatar = data.avatar || config.logo;
    userInfo.username = `账号：${data.username}`;
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
  position: relative;
  background-color: #f9fafb;
  .page-wrap__top {
    display: flex;
    align-items: center;
    width: 100%;
    height: 168px;
    background-color: #000;
    .page-wrap__avatar {
      margin: 0 20px;
      background-color: #fff;
      border-radius: 50%;
      overflow: hidden;
      padding: 4px;
    }
  }
  .page-wrap__content {
    margin-top: 20px;
    padding: 0 14px;
    box-sizing: border-box;
    ::v-deep .u-cell-group__wrapper {
      border-radius: 5px;
      background-color: #fff;
    }
  }
  .page-wrap__btn {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px 14px;
    ::v-deep .u-text {
      margin-top: 10px !important;
    }
  }
}
</style>
