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
              mode="widthFix"
              @click="previewImage(index)"
            ></image>
            <button size="mini" @click="deleteImage(index)">删除</button>
          </view>
        </view>
        <view
          v-show="imageList.length < 1"
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
          :rows="10"
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
import { onLoad, onShow } from "@dcloudio/uni-app";
import { WANDER_API } from "@/api/wander";
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
  request(WANDER_API.getWanderDetail, {
    method: "GET",
    data: {
      id: id.value,
    },
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode == 0) {
        if (data) {
          baseFormData.title = data.title;
          baseFormData.date = data.date;
          baseFormData.content = data.content;
          if (data.photo) {
            imageList.push({
              name: "image",
              uri: data.photo,
            });
          }
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const imageList: Array<{ uri: string; name: string }> = reactive([]);

const uploadFile = () => {
  uni.chooseImage({
    count: 1,
    success(res: any) {
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

const previewImage = (index: number) => {
  uni.previewImage({
    current: imageList[index].uri,
    urls: imageList.map((item) => item.uri),
  });
};

const deleteImage = (index: number) => {
  imageList.splice(index, 1);
};

const valiForm = ref<any>(null);

const onSubmit = () => {
  valiForm.value.validate().then((res: any) => {
    if (id.value) {
      res.id = id.value;
    }
    loading.value = true;
    uni.uploadFile({
      url: WANDER_API.addWander,
      files: imageList,
      formData: res,
      success(result: any) {
        loading.value = false;
        const data = JSON.parse(result.data);
        const { errorCode, message } = data;
        if (errorCode == 0) {
          uni.showToast({
            title: message,
            icon: "success",
            duration: 500,
            success() {},
          });
        }
      },
      fail(err: any) {
        loading.value = false;
      },
    });
  });
};
</script>
