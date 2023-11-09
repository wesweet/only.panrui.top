<template>
  <view>
    <button @click="uploadFile">上传文件</button>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ref } from "vue";
// 导入配置接口
import { HTTP_REQUEST_URL } from "@/config/app";
// 导入接口
import { appApi } from "@/api/app";
const uploadFile = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log(res);
      uni.uploadFile({
        url: HTTP_REQUEST_URL + appApi.uploadFile,
        filePath: res.tempFilePaths[0],
        name: "file",
        formData: {
          a: 1,
          b: 2,
        },
        success: (res) => {
          console.log(res);
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped></style>
