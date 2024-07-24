<template>
  <view>
    <button @click="uploadFile">上传文件</button>
  </view>
</template>

<script lang="ts" setup>
// 导入接口
const uploadFile = () => {
  // uni.chooseImage({
  //   success: (res) => {
  //     let files = [];
  //     for (let i = 0; i < res.tempFilePaths.length; i++) {
  //       files.push({
  //         name: "file" + i,
  //         uri: res.tempFilePaths[i],
  //       });
  //     }
  //     uni.uploadFile({
  //       url: HTTP_REQUEST_URL + appApi.uploadFile,
  //       files: files,
  //       formData: {
  //         a: 1,
  //         b: 2,
  //       },
  //       success: (res) => {
  //         console.log(res);
  //       },
  //     });
  //   },
  // });
};
</script>

<style lang="scss" scoped></style>
