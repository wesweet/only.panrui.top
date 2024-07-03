<template>
  <prstatus></prstatus>
  <view class="page-wrap">
    <view class="form-box">
      <up-form
        :model="baseFormData"
        :rules="rules"
        ref="valiForm"
        labelPosition="top"
      >
        <up-form-item label="标题" prop="title" borderBottom>
          <up-input v-model="baseFormData.title"></up-input>
        </up-form-item>
        <up-form-item
          label="日期"
          prop="date"
          borderBottom
          @click="show = true"
        >
          <view class="up-form-item__content" @click="show = true">
            {{ baseFormData.date }}
          </view>
        </up-form-item>
        <up-form-item label="图片" prop="photo" borderBottom>
          <up-upload :fileList="imageList" name="1" :maxCount="1" width="300" height="300" @delete="deleteImage"></up-upload>
        </up-form-item>
        <up-form-item label="内容" prop="content" borderBottom>
          <up-textarea v-model="baseFormData.content" placeholder="请输入内容" ></up-textarea>
        </up-form-item>
      </up-form>

      <view class="btn-box">
        <up-button class="primary-btn" text="提交"></up-button>
      </view>
    </view>
    <up-calendar
      :show="show"
      :mode="mode"
      @confirm="confirm"
      @close="show = false"
    ></up-calendar>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { WANDER_API } from "@/api/wander";

const show = ref(false);
const mode = ref("single");
const confirm = (e: any) => {
  baseFormData.date = e[0];
  show.value = false;
};
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
              url: data.photo,
            });
          }
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const imageList: Array<{ url: string; name: string }> = reactive([]);

// const uploadFile = () => {
//   uni.chooseImage({
//     count: 1,
//     success(res: any) {
//       for (let i = 0; i < res.tempFilePaths.length; i++) {
//         const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
//         imageList.push({
//           name: uniqueSuffix,
//           url: res.tempFilePaths[i],
//         });
//       }
//     },
//   });
// };
// 删除图片
const deleteImage = (event: { index: number; }) => {
  imageList.splice(event.index, 1);
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

<style lang="scss" scoped>
.page-wrap {
  .form-box {
    padding: 0 24px;
    /* #ifdef H5 */
    padding-top: 50px;
    /* #endif */

    .up-form-item__content {
      display: flex;
      align-items: center;
      height: 40px;
    }

    ::v-deep .u-form-item__body__left__content__label {
      margin-bottom: 8px;
      color: #0a0a0a;
      font-size: 18px;
      font-weight: bold;
    }
    ::v-deep .u-border {
      border: 1px solid #71717a;
    }
  }
}
.btn-box {
  width: 100px;
  margin-top: 30px;
}
.primary-btn {
  background-color: #181818;
  color: #fff;
}
</style>
