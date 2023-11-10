<!--
 * @Description: 新增流浪日记
 * @Author: panrui
 * @Date: 2023-11-03 08:52:58
 * @LastEditTime: 2023-11-10 11:19:41
 * @LastEditors: panrui
 * 不忘初心,不负梦想
-->
<template>
  <view class="form-box">
    <uni-forms
      ref="valiForm"
      :rules="rules"
      :modelValue="baseFormData"
      label-position="top"
    >
      <uni-forms-item label="标题" name="title">
        <uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
      </uni-forms-item>
      <uni-forms-item label="日期" name="date">
        <uni-datetime-picker
          type="date"
          :clear-icon="false"
          v-model="baseFormData.date"
          @maskClick="maskClick"
        />
      </uni-forms-item>
      <uni-forms-item label="图片" name="photo">
        <view v-if="src">
          <image :src="src" mode="widthFix" @click="previewImage"></image>
          <button size="mini" @click="deleteImage">删除</button>
        </view>
        <view v-else class="file-picker__box" @click="uploadFile">
          <view class="is-add">
            <view class="icon-add"></view>
            <view class="icon-add rotate"></view>
          </view>
        </view>
      </uni-forms-item>
      <uni-forms-item label="内容" name="content">
        <uni-easyinput
          v-model="baseFormData.content"
          placeholder="请输入内容"
          type="textarea"
          :rows="4"
          maxlength="500"
        />
      </uni-forms-item>
    </uni-forms>
    <button class="primary-btn" @click="onSubmit">提交</button>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
// 导入域名
import { HTTP_REQUEST_URL } from "@/config/app";
import { appApi } from "@/api/app";
// 使用ts 定义表单数据类型接口
interface BaseFormData {
  title: string;
  date: string;
  content: string;
}
// 定义表单数据
const baseFormData: BaseFormData = reactive({
  title: "",
  date: "",
  content: "",
});

// 定义表单验证规则
const rules = reactive({
  title: {
    rules: [{ required: true, errorMessage: "请输入标题" }],
  },
  date: {
    rules: [{ required: true, errorMessage: "请选择日期" }],
  },
  content: {
    rules: [{ required: true, errorMessage: "请输入内容" }],
  },
});

// 定义图片地址
const src = ref("");

const maskClick = () => {};

// 图片选择
// const s4 = () => {
//   return Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// };

/**
 * 生成一个UUID
 * @returns {string} 生成的UUID
 */
// const generateUUID = () => {
//   return (
//     s4() +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     s4() +
//     s4()
//   );
// };

// 调用 uni 模块的 chooseImage 方法选择图片
const uploadFile = () => {
  uni.chooseImage({
    // 选择的图片数量为 1
    count: 1,
    // 当选择的图片获取成功后执行的回调函数
    success(res: any) {
      // 将选择的图片的临时文件路径赋值给 src
      src.value = res.tempFilePaths[0];
    },
  });
};

// 预览图片
const previewImage = () => {
  uni.previewImage({
    // 当前显示图片的URL
    current: src.value,
    // 图片的URL数组
    urls: [src.value],
  });
};

const deleteImage = () => {
  src.value = ""; // 清空图片源
};

// 定义一个ref对象valiForm，并初始化为null
const valiForm = ref<any>(null);

// 定义一个onSubmit函数
const onSubmit = () => {
  // 验证valiForm对象的值，并返回结果
  valiForm.value.validate().then((res: any) => {
    // 调用uni.uploadFile方法上传文件
    uni.uploadFile({
      // 请求的url
      url: HTTP_REQUEST_URL + appApi.addWander,
      // 文件的路径
      filePath: src.value,
      // 文件表单的name属性
      name: "file",
      // 文件上传的formData数据
      formData: res,
      // 文件上传成功回调函数
      success(result: any) {
        console.log(result);
        // 从结果中获取errorCode和message
        const { errorCode, message } = result;
        // 如果errorCode为0，表示上传成功
        if (errorCode == 0) {
          // 显示成功提示信息
          uni.showToast({
            title: message,
            icon: "success",
            duration: 1500,
            // 成功提示框关闭后的回调函数
            success() {
              // 跳转到其他页面
              uni.navigateTo({
                url: "/pages/dhphoto/dhphoto",
              });
            },
          });
        }
      },
      // 文件上传失败回调函数
      fail(err: any) {
        console.log(err);
      },
    });
  });
};
</script>

<style lang="scss" scoped>
.form-box {
  box-sizing: border-box;
  padding: 10rpx 40rpx 0;
  .file-picker__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150rpx;
    height: 150rpx;
    border-width: 2rpx;
    border-style: solid;
    border-color: rgb(238, 238, 238);
    border-radius: 6rpx;
    .is-add {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-add {
        width: 50px;
        height: 5px;
        background-color: #f1f1f1;
        border-radius: 2px;
        &.rotate {
          position: absolute;
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        }
      }
    }
  }

  .primary-btn {
    background-color: #4263eb;
    color: aliceblue;
  }
}
</style>
