<template>
  <view class="page-wrap"></view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
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
}
// 定义显示的数据
const wanderList = ref<Wander[]>([]);
// 获取流浪列表
const getWanderList = () => {
  request(appApi.getWanderList, {
    method: "GET",
    data: pagination,
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode) {
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
      wanderList.value = wanderList.value.concat(data.list);
      total.value = data.total;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

// 执行获取流浪列表
getWanderList();
</script>
