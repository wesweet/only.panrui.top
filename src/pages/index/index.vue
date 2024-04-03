<!--
 * @Description: 首页
 * @Author: panrui
 * @Date: 2023-05-25 14:12:37
 * @LastEditTime: 2023-12-04 23:49:05
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
  <uni-card @click="onClick" :title="calendarData.content">
    <view class="uni-body">
      <image
        class="thumbnail"
        :src="calendarData.firstImage"
        mode="widthFix"
        @click.stop="previewImage(calendarData.firstImage)"
      ></image>
      <text></text>
      <text># {{ calendarData.typeName }}</text>
    </view>
  </uni-card>
</template>

<script setup lang="ts">
import StatusBar from "@/components/StatusBar.vue";
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import { onLoad, onShow } from "@dcloudio/uni-app";
const cover = ref("/static/20231016112713.jpg");
const onClick = () => {};
// 定义日历数据
const calendarData = reactive({
  content: "",
  firstImage: "",
  typeName: "",
});
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
        if (data) {
          const info = data.data[0];
          calendarData.content = info.content;
          calendarData.firstImage = info.firstImage;
          calendarData.typeName = info.typeName;
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
