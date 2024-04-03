<!--
 * @Description: 首页
 * @Author: panrui
 * @Date: 2023-05-25 14:12:37
 * @LastEditTime: 2024-04-03 20:27:11
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <StatusBar></StatusBar>
  <uni-notice-bar
    is-shadow="true"
    background-color="#333333"
    color="#ffffff"
    show-icon
    scrollable
    text="初心不负App正式发布了、欢迎大家下载体验、有问题请联系我(1547177202)、谢谢！"
  />
  <uni-card @click="onClick" title="今日日历">
    <view class="uni-body">
      <image
        class="thumbnail"
        :src="moyu_url"
        mode="widthFix"
        @click.stop="previewImage(moyu_url)"
      ></image>
    </view>
  </uni-card>
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import { onLoad, onShow } from "@dcloudio/uni-app";
const onClick = () => {};
const moyu_url = ref();
onLoad(() => {
  getCalendar();
});
// 获取当前日历
const getCalendar = () => {
  request(appApi.calendar, {
    method: "GET",
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode == 0) {
        uni.showToast({
          title: errorMessage,
          duration: 2000,
          icon: "none",
        });
        console.log(data);
        if (data) {
          moyu_url.value = data.moyu_url;
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const previewImage = (photo: any) => {
  uni.previewImage({
    current: photo,
    urls: [photo],
  });
};
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 100%;
}
.uni-body {
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #606266;
  display: flex;
  flex-direction: column;
}
</style>
