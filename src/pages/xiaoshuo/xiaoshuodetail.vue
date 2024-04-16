<template>
  <StatusBar></StatusBar>
  <uni-nav-bar shadow dark title="小说板块" />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import StatusBar from "@/components/StatusBar.vue";
import { onLoad } from "@dcloudio/uni-app";
const searchData = reactive({
  name: "",
  n: "",
});
const getDetail = () => {
  request(appApi.novel, {
    method: "GET",
    data: searchData,
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      console.log(res);
      if (errorCode == 0) {
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
// 获取url参数
onLoad((option) => {
  searchData.name = option.name;
  searchData.n = option.n;
  getDetail();
});
</script>

<style lang="scss"></style>
