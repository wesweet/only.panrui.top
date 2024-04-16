<!--
 * @Description: 
 * @Author: prui
 * @Date: 2024-04-16 08:49:21
 * @LastEditTime: 2024-04-16 14:32:46
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <uni-nav-bar shadow dark title="小说板块" />
  <view class="searchBox">
    <uni-easyinput
      prefixIcon="search"
      v-model="value"
      placeholder="左侧图标"
      @input="search"
    ></uni-easyinput>
    <view class="scroll-view-box">
      <scroll-view class="scroll-view" scroll-y="true">
        <uni-section :title="value" type="line" v-if="value">
          <uni-list :border="false">
            <uni-list-item
              v-for="(item, index) in searchList"
              clickable
              @click="toDetail(item)"
            >
              <template v-slot:header>
                <image
                  class="slot-image"
                  :src="item.img"
                  mode="widthFix"
                ></image>
              </template>
              <template v-slot:body>
                <view class="slot-body">
                  <view class="slot-body-title">{{ item.title }}</view>
                  <view class="slot-body-type">{{ item.type }}</view>
                  <view class="slot-body-author">{{ item.author }}</view>
                  <view class="slot-body-newContent">{{
                    item.newContent
                  }}</view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
        </uni-section>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import StatusBar from "@/components/StatusBar.vue";
import { onLoad } from "@dcloudio/uni-app";

// 定义搜索条件
const value = ref("");

// 定义结果列表
const searchList = ref<any[]>([]);

// 设置一个定时器变量
let timer: any = null;

// 搜索事件
const search = (value: any) => {
  // 使用函数防抖 如果300毫秒之内继续触发，则取消上次的定时器，重新开始计时
  if (!value) {
    return;
  }
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    request(appApi.novel, {
      method: "GET",
      data: {
        q: value,
      },
    })
      .then((res: any) => {
        const { errorCode, errorMessage, data } = res;
        if (errorCode == 0) {
          searchList.value = data;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, 3000);
};

onLoad(() => {
  value.value = "万古神帝";
  search("万古神帝");
});

// 跳转详情
const toDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/xiaoshuo/xiaoshuodetail?href=${item.href}`,
  });
};
</script>

<style lang="scss">
uni-page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.searchBox {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8rpx;
  box-sizing: border-box;
  overflow: hidden;
  .scroll-view-box {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 60rpx;
    .scroll-view {
      height: 100%;
    }
  }
}
.slot-body {
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #999;
  .slot-body-title {
    font-size: 32rpx;
    font-weight: bolder;
    color: #333;
  }
}
.slot-image {
  width: 160rpx;
  height: 200rpx;
}
</style>
