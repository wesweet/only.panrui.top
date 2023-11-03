<!--
 * @Description: 新增流浪日记
 * @Author: panrui
 * @Date: 2023-11-03 08:52:58
 * @LastEditTime: 2023-11-03 16:43:02
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
      <uni-forms-item label="标题" required name="title">
        <uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
      </uni-forms-item>
      <uni-forms-item label="日期" required name="date">
        <uni-datetime-picker
          type="date"
          :clear-icon="false"
          v-model="baseFormData.date"
          @maskClick="maskClick"
        />
      </uni-forms-item>
      <uni-forms-item label="照片" required name="photo">
        <uni-file-picker
          v-model="baseFormData.photo"
          file-mediatype="image"
          @select="select"
          @delete="deleteImg"
          mode="grid"
          :limit="9"
          :auto-upload="false"
        ></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item label="内容" required name="content">
        <uni-easyinput
          v-model="baseFormData.content"
          placeholder="请输入内容"
          type="textarea"
          :rows="4"
        />
      </uni-forms-item>
    </uni-forms>
    <button class="primary-btn" @click="onSubmit">提交</button>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// 使用ts 定义表单数据类型接口
interface BaseFormData {
  title: string;
  date: string;
  photo: Array<string>;
  content: string;
}
// 定义表单数据
const baseFormData: BaseFormData = reactive({
  title: "",
  date: "",
  photo: [],
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
  photo: {
    rules: [{ required: true, errorMessage: "请选择照片" }],
  },
  content: {
    rules: [{ required: true, errorMessage: "请输入内容" }],
  },
});
const maskClick = () => {};
// 图片选择
const select = (res: any) => {
  baseFormData.photo.push(res.tempFiles[0]);
};
// 删除图片
const deleteImg = (res: any) => {
  // 通过uuid删除图片
  baseFormData.photo = baseFormData.photo.filter(
    (item: any) => item.uuid !== res.tempFiles[0].uuid
  );
};
const valiForm = ref<any>(null);
const onSubmit = () => {
  // 表单校验
  valiForm.value
    .validate()
    .then((res: any) => {
      console.log(res);
      if (res) {
        uni.showToast({
          title: "提交成功",
          duration: 2000,
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.form-box {
  box-sizing: border-box;
  padding: 10rpx 40rpx 0;
  .primary-btn {
    background-color: #4263eb;
    color: aliceblue;
  }
}
</style>
