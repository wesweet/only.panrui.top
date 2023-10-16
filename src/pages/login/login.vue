<template>
  <view class="box">
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
      <button size="mini" @click="register">注册</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { fetchLogin } from "@/api/app";
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

  // 发送请求
  const res = await fetchLogin(formData);

  if (res.errorCode === 0) {
    uni.setStorageSync("token", res.data.token);
    uni.setStorageSync("userId", res.data.userId);
    uni.switchTab({
      url: "/pages/index/index",
    });
  } else {
    uni.showToast({
      title: res.errorMessage,
      icon: "none",
    });
  }
};

// 点击注册事情
const register = () => {
  uni.navigateTo({
    url: "/pages/reg/reg",
  });
};
</script>

<style lang="scss" scoped>
uni-page-body {
  height: 100%;
}
.box {
  height: 100%;
  background-image: linear-gradient(to bottom, #c6ffdd, #fbd786, #f7797d);
}
.uni-forms {
  padding: 300rpx 50rpx 0;
}
.uni-flex {
  display: flex;
}
.uni-flex-pack-around {
  display: flex;
  margin-left: 65px;
  padding: 50rpx 50rpx 0;
  justify-content: space-between;
}
</style>
