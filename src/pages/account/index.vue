<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-18 17:15:31
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-24 16:55:57
 * @FilePath: \only.panrui.top\src\pages\account\index.vue
 * @Description: 账号管理列表界面
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="账号" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <up-search
      :inputStyle="inputStyle"
      placeholder="请输入关键字"
      shape="square"
      :show-action="true"
      actionText="搜索"
      height="48"
      borderColor="#E7EAF0"
      bgColor="#FFFFFF"
      v-model="keyword"
      @custom="searchData"
    ></up-search>

    <view class="account-list">
      <up-collapse :border="false">
        <up-collapse-item
          v-for="(item, index) in accountList"
          :title="item.name + '(' + item.account + ')'"
          name="Docs guide"
        >
          <view class="u-collapse-content">
            <up-text :text="'账号：' + item.account"></up-text>
            <up-text :text="'密码：' + item.password"></up-text>
            <up-text :text="'手机：' + item.phone"></up-text>
            <up-text :text="'邮箱：' + item.email"></up-text>
            <up-textarea v-model="item.remark"></up-textarea>
          </view>
        </up-collapse-item>
      </up-collapse>
    </view>

    <view class="icon-add" @click="toDetail('')">
      <up-icon name="plus" size="20" color="#909399"></up-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { request } from "@/utils/request";
import { ACCOUNT_API } from "@/api/account";
// 定义分页参数
const pagination = reactive({
  page: 1,
  limit: 10,
});
const accountList = ref<any[]>([]);
// 初始化一个空对象，用于存放输入框的样式
const inputStyle = {};

let total = ref(0);
const keyword = ref("");
const userInfo = JSON.parse(uni.getStorageSync("userInfo"));
const search = () => {
  request(ACCOUNT_API.getAccountList, {
    data: Object.assign({}, pagination, {
      keyword: keyword.value,
      userId: userInfo.id,
    }),
    method: "GET",
  }).then((res: any) => {
    const { errorCode, errorMessage, data } = res;
    if (errorCode != 0) {
      uni.showToast({
        title: errorMessage,
        duration: 500,
      });
      return;
    }
    accountList.value = accountList.value.concat(data.list);
  });
};

search();

const searchData = () => {
  accountList.value = [];
  search();
};
const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};
// 跳转到详情页面
const toDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/account/detail?id=${id}`,
  });
};

const scrolltolower = () => {};
</script>

<style lang="scss" scoped>
body,
uni-page-body {
  height: 100%;
}
.page-wrap {
  display: flex;
  flex-direction: column;
  /* #ifdef H5 */
  padding: calc(var(--status-bar-height) + 50px) 24px 0;
  /* #endif */
  /* #ifdef APP-PLUS */
  padding: 50px 24px 0;
  /* #endif */
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  .account-list {
    flex: 1;
    box-sizing: border-box;
    padding: 20px 0;
    overflow: auto;
  }
}
.icon-add {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  width: 40px;
  height: 40px;
  bottom: 30px;
  border-radius: 50%;
  background-color: #e1e1e1;
}
.u-search {
  flex: 0;
}
.u-collapse-item {
  margin-bottom: 20px;
  border: 1px solid #e7eaf0;
  border-radius: 10px;
  ::v-deep .u-collapse-item__content {
    border-top: 1px solid #e7eaf0;
  }
  .u-collapse-content {
    .u-text {
      padding: 10px 0;
    }
  }
}
</style>
