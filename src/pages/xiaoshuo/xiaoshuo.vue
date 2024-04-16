<!--
 * @Description: 
 * @Author: prui
 * @Date: 2024-04-16 08:49:21
 * @LastEditTime: 2024-04-16 10:10:08
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <uni-nav-bar shadow dark title="小说板块" />
  <view class="searchBox">
    <uni-easyinput
      prefixIcon="search"
      v-model="searchData.name"
      placeholder="左侧图标"
      @input="search"
    ></uni-easyinput>
    <uni-section :title="searchData.name" type="line" v-if="searchData.name">
      <uni-list :border="false">
        <uni-list-item
          v-for="(item, index) in list"
          :key="index"
          :title="item"
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
const searchData = reactive({
  name: "",
  n: "",
});

// 定义结果列表
const list = ref([]);

// 设置一个定时器变量
let timer: any = null;

// 搜索事件
const search = () => {
  // 使用函数防抖 如果300毫秒之内继续触发，则取消上次的定时器，重新开始计时
  if (!searchData.name) {
    return;
  }
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    request(appApi.novel, {
      method: "GET",
      data: searchData,
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
  }, 300);
};
</script>

<style lang="scss">
.searchBox {
  padding: 4px;
}
</style>
