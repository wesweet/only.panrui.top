<!--
 * @Description: 
 * @Author: prui
 * @Date: 2024-04-16 08:49:21
 * @LastEditTime: 2024-04-16 10:36:43
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
    <uni-section :title="value" type="line" v-if="value">
      <uni-list :border="false">
        <uni-list-item
          v-for="(item, index) in list"
          :key="index"
          :title="item"
          clickable
          @click="toDetail(item)"
        />
      </uni-list>
    </uni-section>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import StatusBar from "@/components/StatusBar.vue";

// 定义搜索条件
const value = ref("");

// 定义结果列表
const list = ref([]);

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
        name: value,
      },
    })
      .then((res: any) => {
        const { errorCode, errorMessage, data } = res;
        console.log(res);
        if (errorCode == 0) {
          // 通过\n 将data中的内容进行分割
          list.value = data.split("\n");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, 3000);
};

// 跳转详情
const toDetail = (item: any) => {
  // 获取首字母
  const firstLetter = item.substr(0, 1);
  uni.navigateTo({
    url: `/pages/xiaoshuo/xiaoshuodetail?name=${value.value}&n=${firstLetter}`,
  });
};
</script>

<style lang="scss">
.searchBox {
  padding: 4px;
}
</style>
