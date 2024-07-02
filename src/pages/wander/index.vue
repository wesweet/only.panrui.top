<!--
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-02 20:07:21
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-02 22:17:00
 * @FilePath: \only.panrui.top\src\pages\wander\index.vue
-->
<template>
  <view class="page-wrap">
    <view class="album-list">
      <view class="album" v-for="(item, index) in wanderList" :key="index" @click="toDetail(item.id)">
        <view class="album__avatar">
          <image
            src="/static/login.png"
            style="width: 24px; height: 24px"
          ></image>
        </view>
        <view class="album__content">
          <up-text :text="item.title" type="primary" bold size="17"></up-text>
          <up-text margin="0 0 8px 0" :text="item.content"></up-text>
          <up-album :urls="item.urls" keyName="src2"></up-album>
          <up-text margin="0 0 8px 0" :text="item.date"></up-text>
        </view>
      </view>
    </view>
    <up-back-top :scroll-top="scrollTop"></up-back-top>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { WANDER_API } from "@/api/wander";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

// 定义分页数据
const pagination = reactive({
  page: 1,
  limit: 10,
});

// 定义渲染数据
let total = ref(0);
// 定义数组中数据的接口
interface Wander {
  id: string;
  title: string;
  content: string;
  photo?: string;
  date: string;
  urls?: string[];
}
// 定义显示的数据
const wanderList = ref<Wander[]>([]);
// 获取流浪列表
const getWanderList = () => {
  request(WANDER_API.getWanderList, {
    method: "GET",
    data: pagination,
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0) {
        uni.showToast({
          title: errorMessage,
          duration: 2000,
          icon: "error",
        });
        return;
      }
      if (!data || (data && data.list.length == 0)) {
        uni.showToast({
          title: "暂无更多内容",
          duration: 2000,
          icon: "error",
        });
      }
      for (let index = 0; index < data.list.length; index++) {
        const element = data.list[index];
        if (element.photo) {
          element.urls = [element.photo];
        }
      }
      wanderList.value = wanderList.value.concat(data.list);
      total.value = data.total;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

// 执行获取流浪列表
getWanderList();

// 定义页面下拉刷新方法
onPullDownRefresh(() => {
  pagination.page = 1;
  wanderList.value = [];
  getWanderList();
  uni.stopPullDownRefresh();
});

onReachBottom(() => {
  if (pagination.page * pagination.limit >= total.value) {
    uni.showToast({
      title: "没有更多数据了",
      duration: 300,
    });
    return;
  }
  pagination.page++;
  getWanderList();
});

// 跳转详情
const toDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/wander/detail?id=${id}`,
  });
};

// 创建响应式数据 scrollTop
const scrollTop = ref(0);

// 定义 onPageScroll 方法来更新 scrollTop 的值
const onPageScroll = (e: { scrollTop: number }) => {
  scrollTop.value = e.scrollTop;
};
</script>

<style lang="scss" scoped>
.page-wrap {
  // height: 100%;
  overflow: auto;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
}
.album-list {
  // height: 100%;
  // overflow: auto;
  padding: 0 24px;
  .scroll-view {
    height: 100%;
  }
}
.album {
  @include flex;
  align-items: flex-start;
  margin-bottom: 10px;

  &__avatar {
    background-color: $u-bg-color;
    padding: 5px;
    border-radius: 3px;
  }

  &__content {
    margin-left: 10px;
    flex: 1;
  }
}
</style>
