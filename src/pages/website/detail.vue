<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-23 13:49:31
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-24 21:39:53
 * @FilePath: \only.panrui.top\src\pages\website\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <prstatus></prstatus>
  <up-navbar title="新增网站" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="form-box">
      <up-form
        labelPosition="top"
        labelWidth="200"
        :model="baseFormData"
        :rules="rules"
        ref="valiForm"
      >
        <up-form-item label="网站名称" prop="name" borderBottom>
          <up-input v-model="baseFormData.name"></up-input>
        </up-form-item>
        <up-form-item label="网站地址" prop="url" borderBottom>
          <up-input v-model="baseFormData.url"></up-input>
        </up-form-item>
        <up-form-item label="网站描述" prop="desc" borderBottom>
          <up-input v-model="baseFormData.desc"></up-input>
        </up-form-item>
        <up-form-item label="网站关键字" prop="keyword" borderBottom>
          <up-textarea v-model="baseFormData.keyword"></up-textarea>
        </up-form-item>
        <up-form-item label="网站图标" prop="chart" borderBottom>
          <up-input v-model="baseFormData.chart"></up-input>
        </up-form-item>
        <up-form-item
          label="关联账号"
          prop="accountId"
          borderBottom
          @click="accountShow = true"
        >
          <up-input
            v-model="accountName"
            disabled
            placeholder="请选择关联账号"
          ></up-input>
        </up-form-item>
        <up-form-item
          label="所属类别"
          prop="tagId"
          borderBottom
          @click="tagShow = true"
        >
          <up-input
            v-model="tagName"
            disabled
            placeholder="请选择所属类别"
          ></up-input>
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

    <up-picker
      :show="tagShow"
      :columns="tagList"
      keyName="name"
      @cancel="tagShow = false"
      @confirm="confirmTag"
      @change="changeTag"
    ></up-picker>

    <up-picker
      :show="accountShow"
      :columns="accountList"
      keyName="name"
      @cancel="accountShow = false"
      @confirm="confirmAccount"
      @change="changeAccount"
    ></up-picker>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { request } from "@/utils/request";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ACCOUNT_API } from "@/api/account";
import { WEBSITE_API } from "@/api/website";
import { useTagStore } from "@/stores/tag";

const userInfo = JSON.parse(uni.getStorageSync("userInfo"));

const accountName = ref("");
const tagName = ref("");

const tagShow = ref(false);
const confirmTag = (item: any) => {
  tagName.value = item.value[0].name;
  baseFormData.tagId = item.value[0].id;
  tagShow.value = false;
};
const changeTag = (item: any) => {};
const tagStore = useTagStore();
const tagList = computed(() => {
  if (!tagStore.tags || tagStore.tags.length === 0) {
    return [];
  }
  const tagList = tagStore.tags.filter((item: any) => {
    return item.useType === "网址收藏";
  });
  return [tagList];
});

const accountShow = ref(false);
const confirmAccount = (item: any) => {
  accountName.value = item.value[0].name;
  baseFormData.accountId = item.value[0].id;
  accountShow.value = false;
};
const changeAccount = (item: any) => {
  console.log(item);
};
const accountList = ref<any[]>([]);
const getAccountList = () => {
  request(ACCOUNT_API.getAccountList, {
    data: Object.assign(
      {},
      {
        userId: userInfo.id,
      }
    ),
    method: "GET",
  }).then((res: any) => {
    const { errorCode, errorMessage, data } = res;
    if (errorCode != 0) {
      uni.showToast({
        title: errorMessage,
        duration: 500,
      });
      return;
    }
    accountList.value = [data.list];
  });
};
getAccountList();

/**
 * 定义基础表单数据类型
 */
interface BaseFormData {
  name: string;
  url: string;
  desc?: string;
  keyword?: string;
  chart?: string;
  accountId?: number;
  tagId?: number;
}

/**
 * 基础表单数据
 */
const baseFormData: BaseFormData = reactive({
  name: "",
  url: "",
  desc: "",
  keyword: "",
  chart: "",
});

/**
 * 定义表单验证规则
 */
const rules = reactive({
  name: {
    type: "string",
    required: true,
    message: "网站名称不能为空",
    trigger: ["blur", "change"],
  },
  url: {
    type: "string",
    required: true,
    message: "网站地址不能为空",
    trigger: ["blur", "change"],
  },
});

/**
 * 控制加载状态的ref
 */
const loading = ref(false);

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
    loading.value = true;
    request(WEBSITE_API.website, {
      data: Object.assign({}, baseFormData),
      method: "POST",
    }).then((res: any) => {
      loading.value = false;
      const { errorCode, message, data } = res;
      if (errorCode == 0) {
        uni.showToast({
          title: message,
          icon: "success",
          duration: 500,
          success: () => {
            back();
          },
        });
      } else {
        uni.showToast({
          title: message,
          icon: "none",
        });
      }
    });
  });
};
const back = () => {
  uni.redirectTo({
    url: "/pages/website/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  /* #ifdef H5 */
  padding: calc(var(--status-bar-height) + 50px) 24px 50px;
  /* #endif */
  /* #ifdef APP-PLUS */
  padding: 50px 24px;
  /* #endif */
  .form-box {
    .up-form-item__content {
      display: flex;
      align-items: center;
      height: 26px;
      width: 100%;
      border: 1px solid #dadbde;
      border-radius: 5px;
      padding: 6px;
      box-sizing: border-box;
    }

    ::v-deep .u-form-item__body__left__content__label {
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
  // width: 100px;
  margin-top: 30px;
}
.primary-btn {
  background-color: #181818;
  color: #fff;
}
</style>
