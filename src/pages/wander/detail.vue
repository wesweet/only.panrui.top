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
          <up-upload
            :fileList="imageList"
            name="1"
            :maxCount="1"
            width="300"
            height="300"
            @afterRead="afterRead"
            @delete="deleteImage"
          ></up-upload>
        </up-form-item>
        <up-form-item label="内容" prop="content" borderBottom>
          <up-textarea
            v-model="baseFormData.content"
            placeholder="请输入内容"
          ></up-textarea>
        </up-form-item>
      </up-form>

      <view class="btn-box">
        <up-button
          :loading="loading"
          loadingText="加载中"
          class="primary-btn"
          text="提交"
          @click="onSubmit"
        ></up-button>
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

const id = ref("");
onLoad((options: any) => {
  if (options.id) {
    id.value = options.id;
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
      if (errorCode != 0 || !data) {
        uni.showToast({
          title: errorMessage,
          duration: 2000,
          icon: "error",
        });
        return;
      }

      baseFormData.title = data.title;
      baseFormData.date = data.date;
      baseFormData.content = data.content;
      if (data.photo) {
        imageList.push({
          name: "image",
          url: data.photo,
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const loading = ref(false);
const rules = reactive({
  title: {
    type: "string",
    required: true,
    message: "标题不能为空",
    trigger: ["blur", "change"],
  },
  date: {
    type: "string",
    required: true,
    message: "日期不能为空",
    trigger: ["blur", "change"],
  },
  content: {
    type: "string",
    required: true,
    message: "内容不能为空",
    trigger: ["blur", "change"],
  },
});
const imageList: Array<{ url: string; name: string }> = reactive([]);

const valiForm = ref<any>(null);

const onSubmit = () => {
  valiForm.value.validate().then((res: any) => {
    if (!res) {
      return;
    }
    loading.value = true;
    uni.uploadFile({
      url: WANDER_API.addWander,
      files: imageList.map((item) => {
        return {
          uri: item.url,
          name: item.name,
        };
      }),
      formData: Object.assign({}, baseFormData, {
        id: id.value,
      }),
      success(result: any) {
        const data = JSON.parse(result.data);
        const { errorCode, message } = data;
        if (errorCode == 0) {
          uni.showToast({
            title: message,
            icon: "success",
            duration: 500,
          });
        }
      },
      fail(err: any) {
        console.log(err);
      },
      complete() {
        loading.value = false;
      },
    });
  });
};

const show = ref(false);
const mode = ref("single");
const confirm = (e: any) => {
  baseFormData.date = e[0];
  show.value = false;
};
interface BaseFormData {
  title: string;
  date: string;
  content: string;
}
const baseFormData: BaseFormData = reactive({
  title: "",
  date: "",
  content: "",
});

const afterRead = (event: any) => {
  imageList.push({
    name: event.file.name,
    url: event.file.url,
  });
};
const deleteImage = (event: { index: number }) => {
  imageList.splice(event.index, 1);
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
