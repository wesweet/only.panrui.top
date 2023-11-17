<!--
 * @Description: 新增流浪日记
 * @Author: panrui
 * @Date: 2023-11-03 08:52:58
 * @LastEditTime: 2023-11-17 16:42:27
 * @LastEditors: prui
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
        <view class="grid-box">
          <view
            class="grid-box-item"
            v-for="(item, index) in imageList"
            :index="index"
            :key="index"
          >
            <image
              :src="item.uri"
              mode="aspectFill"
              @click="previewImage(index)"
            ></image>
            <button size="mini" @click="deleteImage(index)">删除</button></view
          >
        </view>
        <view
          v-show="imageList.length < 9"
          class="file-picker__box"
          @click="uploadFile"
        >
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
    <button
      class="primary-btn"
      @click="onSubmit"
      :loading="loading"
      :disabled="loading"
    >
      提交
    </button>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
// 导入域名
import { HTTP_REQUEST_URL } from "@/config/app";
import { appApi } from "@/api/app";
import { onLoad, onShow } from "@dcloudio/uni-app";
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

// 定义按钮状态
const loading = ref(false);

// 定义图片地址

// 定义一个名为 maskClick 的箭头函数
const maskClick = () => {};

const id = ref("");
// 判断上一个页面传递过来的id
onLoad((options: any) => {
  // 页面显示时，判断是否有传递过来的id
  if (options.id) {
    // 有传递过来的id，则将id赋值给baseFormData.id
    id.value = options.id;
    // 调用接口获取数据
    getWanderDetail();
  }
});

const getWanderDetail = () => {
  request(appApi.getWanderDetail, {
    method: "GET",
    data: {
      id: id.value,
    },
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
          baseFormData.title = data.title;
          baseFormData.date = data.date;
          baseFormData.content = data.content;
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
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

const imageList: Array<{ uri: string; name: string }> = reactive([]);

// 调用 uni 模块的 chooseImage 方法选择图片
const uploadFile = () => {
  uni.chooseImage({
    success(res: any) {
      // 将当前选择的图片的临时文件路径赋值给 src
      for (let i = 0; i < res.tempFilePaths.length; i++) {
        const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
        imageList.push({
          name: uniqueSuffix,
          uri: res.tempFilePaths[i],
        });
      }
    },
  });
};

// 预览图片
const previewImage = (index: number) => {
  uni.previewImage({
    // 当前显示图片的URL
    current: imageList[index].uri,
    // 图片的URL数组
    urls: imageList.map((item) => item.uri),
  });
};

const deleteImage = (index: number) => {
  imageList.splice(index, 1);
};

// 定义一个ref对象valiForm，并初始化为null
const valiForm = ref<any>(null);

// 定义一个onSubmit函数
const onSubmit = () => {
  // 验证valiForm对象的值，并返回结果
  valiForm.value.validate().then((res: any) => {
    // 如果存在id，将id赋值给baseFormData.id
    if (id.value) {
      res.id = id.value;
    }
    // 调用uni.uploadFile方法上传文件
    loading.value = true;
    uni.uploadFile({
      // 请求的url
      url: HTTP_REQUEST_URL + appApi.addWander,
      // 文件的路径
      files: imageList,
      // 文件上传的formData数据
      formData: res,
      // 文件上传成功回调函数
      success(result: any) {
        loading.value = false;
        const data = JSON.parse(result.data);
        // 从结果中获取errorCode和message
        const { errorCode, message } = data;
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
        loading.value = false;
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
  .grid-box {
    display: flex;
    flex-wrap: wrap;
    .grid-box-item {
      width: 33%;
      height: 300rpx;
    }
  }
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
image {
  width: 100%;
  height: 70%;
  will-change: transform;
}
</style>
