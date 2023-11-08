<!--
 * @Description: 新增流浪日记
 * @Author: panrui
 * @Date: 2023-11-03 08:52:58
 * @LastEditTime: 2023-11-08 13:27:25
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

const maskClick = () => {};

// 图片选择
const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

/**
 * 生成一个UUID
 * @returns {string} 生成的UUID
 */
const generateUUID = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const valiForm = ref<any>(null);
// 定义一个名为onSubmit的箭头函数
const onSubmit = () => {
  // 调用valiForm.value.validate()方法进行表单验证，并返回一个Promise对象
  valiForm.value.validate().then((res: any) => {
    // 使用request函数向appApi.addWander发送POST请求，传入的数据为res对象
    request(appApi.addWander, {
      method: "POST",
      data: res,
    })
      // 请求成功的回调函数
      .then((res: any) => {
        // 打印请求返回的结果res
        console.log(res);
      })
      // 请求失败的回调函数
      .catch((err) => {
        // 打印错误信息err
        console.log(err);
      });
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
