<!-- <template>
  <prstatus></prstatus>
  <up-navbar title="照片墙" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <up-waterfall v-model="photos">
      <template v-slot:left="{ leftList }">
        <view
          class="demo-warter"
          v-for="(item, index) in leftList"
          :key="index"
        >
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.url"
            :index="index"
          ></up-lazy-load>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view
          class="demo-warter"
          v-for="(item, index) in rightList"
          :key="index"
        >
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.url"
            :index="index"
          ></up-lazy-load>
        </view>
      </template>
    </up-waterfall>
  </view>
</template>



<style lang="scss" scoped>
.page-wrap {
  padding: 44px 0;

  .demo-warter {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    padding: 8px;
    position: relative;
  }
  .demo-image {
    width: 100%;
    border-radius: 4px;
  }
}
</style> -->

<template>
  <prstatus></prstatus>
  <up-navbar title="照片墙" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <up-waterfall v-model="photos" ref="uWaterfallRef">
      <template v-slot:left="{ leftList }">
        <view
          class="demo-warter"
          v-for="(item, index) in leftList"
          :key="index"
        >
          <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.url"
            :index="index"
          ></up-lazy-load>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view
          class="demo-warter"
          v-for="(item, index) in rightList"
          :key="index"
        >
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.url"
            :index="index"
          ></up-lazy-load>
        </view>
      </template>
    </up-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";

const id = ref("");
onLoad((options: any) => {});

// 从缓存中读取照片
const photos = ref<string[]>([]);
onShow(() => {
  photos.value = uni.getStorageSync("photos") || [];
});
const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  padding: 44px 0;
}
.demo-warter {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}

.demo-image {
  width: 100%;
  border-radius: 4px;
}
</style>
