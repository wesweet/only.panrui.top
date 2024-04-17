<!--
 * @Description: 发现页
 * @Author: prui
 * @Date: 2024-04-17 13:49:41
 * @LastEditTime: 2024-04-17 15:25:32
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view>
    <uni-card>
      <uni-grid
        :column="4"
        :show-border="false"
        :square="false"
        :highlight="false"
        @change="change"
      >
        <uni-grid-item
          v-for="(item, index) in list"
          :index="index"
          :key="index"
        >
          <view class="grid-item-box">
            <image class="image" :src="item.url" mode="aspectFill" />
            <text class="text">{{ item.text }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const list = reactive([
  {
    text: "文档",
    url: "/static/wendang.png",
    page: "/pages/wendang/wendang",
    channel: "app",
  },
  {
    text: "时光机",
    url: "/static/love.png",
    page: "/pages/dhphoto/dhphoto",
    channel: "all",
  },
  {
    text: "地铁",
    url: "/static/ditie.png",
    page: "/pages/ditie/ditie",
    channel: "app",
  },
  {
    text: "小说",
    url: "/static/dianzishu.png",
    page: "/pages/xiaoshuo/xiaoshuo",
    channel: "app",
  },
]);
const change = (e: any) => {
  // 将page声明为string或者undefined
  let page = list[e.detail.index].page;
  if (!page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
    });
  } else {
    uni.navigateTo({
      url: page,
    });
  }
};
</script>

<style lang="scss">
.grid-item-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image {
    width: 25px;
    height: 25px;
  }
}
</style>
