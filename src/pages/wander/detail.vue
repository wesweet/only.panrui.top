<template>
  <prstatus></prstatus>
  <up-navbar title="时光机" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="form-box">
      <up-form
        :model="baseFormData"
        :rules="rules"
        ref="valiForm"
        labelPosition="top"
      >
        <up-form-item label="标题" prop="title">
          <up-input v-model="baseFormData.title"></up-input>
        </up-form-item>
        <up-form-item label="日期" prop="date" @click="show = true">
          <view class="up-form-item__content" @click="show = true">
            {{ baseFormData.date }}
          </view>
        </up-form-item>
        <up-form-item label="图片" prop="photo">
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
        <up-form-item label="内容" prop="content">
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
          :custom-style="customStyle"
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
import { route, toast } from "@/uni_modules/uview-plus";
import {
  getWanderDetail,
  saveWander,
  saveWanderNoPhoto,
} from "@/common/api/wander";

/**
 * 页面初始化时获取传入的id，并根据id加载游记详情
 */
const id = ref("");
onLoad((options: any) => {
  if (options.id) {
    id.value = options.id;
    fetchGetWanderDetail();
  }
});

/**
 * 获取游记详情
 */
const fetchGetWanderDetail = () => {
  getWanderDetail({ id: id.value })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0 || !data) {
        toast(errorMessage);
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
    })
    .finally(() => {});
};

/**
 * 控制加载状态的ref
 */
const loading = ref(false);
/**
 * 定义表单验证规则
 */
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
/**
 * 图片列表
 */
const imageList: Array<{ url: string; name: string }> = reactive([]);

/**
 * 表单验证实例ref
 */
const valiForm = ref<any>(null);

/**
 * 提交表单
 */
const onSubmit = () => {
  valiForm.value.validate().then((res: any) => {
    if (!res) {
      return;
    }
    const data: any = Object.assign({}, baseFormData, {
      id: id.value,
      photo: [],
    });
    // 直接上传新图片
    if (imageList.length && !imageList[0].name) {
      saveWander({
        filePath: imageList.length && imageList[0].url,
        name: "file",
        formData: Object.assign({}, baseFormData, {
          id: id.value,
        }),
      })
        .then((res: any) => {
          const { errorCode, errorMessage } = res;
          if (errorCode != 0) {
            toast(errorMessage);
            return;
          }
          toast("提交成功");
          uni.navigateBack({
            delta: 1,
          });
        })
        .catch((err: any) => {})
        .finally(() => {});
    }
    // 原有图片没有修改 或者不存在图片
    if ((imageList.length && imageList[0].name) || imageList.length == 0) {
      data.photo = imageList.length > 0 ? imageList[0].url : "";
      saveWanderNoPhoto(data)
        .then((res: any) => {
          const { errorCode, errorMessage } = res;
          if (errorCode != 0) {
            toast(errorMessage);
            return;
          }
          toast("提交成功");
          uni.navigateBack({
            delta: 1,
          });
        })
        .catch((err: any) => {})
        .finally(() => {});
    }
  });
};

/**
 * 日期选择器的回调，设置选中的日期
 */
const show = ref(false);
const mode = ref("single");
const confirm = (e: any) => {
  baseFormData.date = e[0];
  show.value = false;
};

/**
 * 定义基础表单数据类型
 */
interface BaseFormData {
  title: string;
  date: string;
  content: string;
}

/**
 * 基础表单数据
 */
const baseFormData: BaseFormData = reactive({
  title: "",
  date: "",
  content: "",
});

/**
 * 图片上传回调，将上传的图片添加到列表
 */
const afterRead = (event: any) => {
  imageList.push({
    name: event.file.name,
    url: event.file.url,
  });
};

/**
 * 删除图片
 * @param event 删除操作携带的索引信息
 */
const deleteImage = (event: { index: number }) => {
  imageList.splice(event.index, 1);
};

const back = () => {
  uni.redirectTo({
    url: "/pages/wander/index",
  });
};

const customStyle = reactive({
  backgroundColor: "#181818",
  color: "#fff",
});
</script>

<style lang="scss" scoped>
.page-wrap {
  /* #ifdef H5 */
  padding: calc(var(--status-bar-height) + 50px) 24px 50px;
  /* #endif */
  /* #ifdef APP-PLUS */
  padding: 50px 24px;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  padding: calc(var(--status-bar-height) + 50px) 24px 50px;
  /* #endif */
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  min-height: 100%;
  box-sizing: border-box;
  .form-box {
    .up-form-item__content {
      display: flex;
      align-items: center;
      height: 34px;
      width: 100%;
      border: 1px solid #dadbde;
      border-radius: 5px;
      padding: 6px;
      box-sizing: border-box;

      /* #ifdef MP-WEIXIN */
      .u-line {
        display: none !important;
      }
      /* #endif */
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
</style>
