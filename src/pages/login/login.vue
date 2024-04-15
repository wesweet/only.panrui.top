<template>
  <StatusBar></StatusBar>
  <uni-nav-bar
    left-icon="left"
    left-text="返回"
    @clickLeft="back"
    shadow
    dark
    title="登录"
  />
  <uni-forms ref="form" class="uni-forms" :rules="rules" :model="formData">
    <uni-forms-item label="账号" name="username" required>
      <uni-easyinput
        class="uni-mt-5"
        trim="all"
        v-model="formData.username"
        placeholder="请输入账号"
      ></uni-easyinput>
    </uni-forms-item>
    <uni-forms-item label="密码" name="password" required>
      <uni-easyinput
        type="password"
        v-model="formData.password"
        placeholder="请输入密码"
      ></uni-easyinput>
    </uni-forms-item>
  </uni-forms>
  <view class="uni-flex-pack-around">
    <button size="mini" @click="login">登录</button>
    <!-- <button size="mini" @click="register">注册</button> -->
  </view>
</template>

<script lang="ts" setup>
import StatusBar from "@/components/StatusBar.vue";
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import { onReady } from "@dcloudio/uni-app";
// 定义接口
interface IFormData {
  username: string;
  password: string;
}
// 使用定义的接口创建一个响应式对象
const formData: IFormData = reactive({
  username: "wesweet",
  password: "Pr338535",
});
// 定义表单校验规则
const rules = {
  username: {
    rules: [
      { required: true, errorMessage: "请输入账号", trigger: "blur" },
      {
        minLength: 3,
        maxLength: 10,
        errorMessage: "长度在 3 到 10 个字符",
        trigger: "blur",
      },
    ],
  },
  password: {
    rules: [
      { required: true, errorMessage: "请输入密码", trigger: "blur" },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "长度在 6 到 20 个字符",
        trigger: "blur",
      },
    ],
  },
};
// 获取表单实例
const form = ref<any>("");
// 在onready生命周期中设置规则
onReady(() => {
  form.value.setRules(rules);
});
// 点击登录事情,对表单进行校验
const login = async () => {
  // 校验表单
  const valid = await form.value.validate();
  if (!valid) {
    return;
  }
  request(appApi.login, {
    data: formData,
    method: "POST",
  }).then((res: any) => {
    if (res.errorCode == 0) {
      uni.setStorageSync("token", res.data.access_token);
      uni.setStorageSync("userId", res.data.userId);
      back();
    } else {
      uni.showToast({
        title: res.errorMessage,
        icon: "none",
      });
    }
  });
};

// 点击注册事情
const register = () => {
  uni.navigateTo({
    url: "/pages/reg/reg",
  });
};

const back = () => {
  // 关闭当前页面返回上一个面
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style lang="scss" scoped>
uni-page-body {
  height: 100%;
}
.box {
  height: 100%;
  // background-color: #333333;
  // background-image: linear-gradient(to bottom, #c6ffdd, #fbd786, #f7797d);
}
.uni-forms {
  padding: 200rpx 50rpx 0;
}
// .uni-flex {
//   // display: flex;
// }
.uni-flex-pack-around {
  display: flex;
  padding: 50rpx 50rpx 0;
  justify-content: space-between;
}
</style>
