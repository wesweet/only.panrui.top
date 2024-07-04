<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-04 15:29:57
 * @FilePath: \only.panrui.top\src\pages\tabbar\index.vue
-->
<template>
  <prstatus></prstatus>
  <up-navbar title="" leftIcon="" :autoBack="false"> </up-navbar>
  <view class="page-wrap">
    <view class="page-wrap__top">
      <up-text
        text="你想去那里？"
        color="#121212"
        size="24px"
        :block="flagTrue"
        :bold="flagTrue"
      ></up-text>

      <up-search
        style="margin-top: 30px"
        :inputStyle="inputStyle"
        placeholder="搜索你想去的地方"
        shape="square"
        :show-action="false"
        height="48"
        borderColor="#E7EAF0"
        bgColor="#FFFFFF"
        v-model="keyword"
      ></up-search>
    </view>

    <view class="tag-box">
      <view
        class="item"
        :class="{ active: index == currentTagIndex }"
        @click="tagClick(index)"
        v-for="(item, index) in tagList"
        :key="index"
      >
        {{ item.title }}
      </view>
    </view>

    <view class="card-box">
      <view class="item">
        <up-image
          class="image"
          width="100%"
          height="150"
          radius="20"
          src="/static/fengjing1.jpg"
        ></up-image>
      </view>
      <view class="item">
        <up-image
          class="image"
          width="100%"
          height="150"
          radius="20"
          src="/static/fengjing1.jpg"
        ></up-image>
      </view>
      <view class="item">
        <up-image
          class="image"
          width="100%"
          height="150"
          radius="20"
          src="/static/fengjing1.jpg"
        ></up-image>
      </view>
      <view class="item">
        <up-image
          class="image"
          width="100%"
          height="150"
          radius="20"
          src="/static/fengjing1.jpg"
        ></up-image>
      </view>
    </view>

    <view class="page-wrap__bottom">
      <up-text
        text="时光隧道"
        color="#121212"
        size="20px"
        :block="flagTrue"
        :bold="flagTrue"
      ></up-text>

      <view class="na-box">
        <up-grid :border="false" col="3">
          <up-grid-item
            v-for="(listItem, listIndex) in navList"
            :key="listIndex"
            @click="navClick(listIndex)"
          >
            <up-icon :name="listItem.image" :size="22"></up-icon>
            <text class="grid-text">{{ listItem.title }}</text>
          </up-grid-item>
        </up-grid>
      </view>

      <up-text
        text="时光隧道"
        color="#121212"
        size="20px"
        :block="flagTrue"
        :bold="flagTrue"
      ></up-text>

      <view class="na-box">
        <up-grid :border="false" col="3">
          <up-grid-item
            v-for="(listItem, listIndex) in navList"
            :key="listIndex"
            @click="navClick(listIndex)"
          >
            <up-icon :name="listItem.image" :size="22"></up-icon>
            <text class="grid-text">{{ listItem.title }}</text>
          </up-grid-item>
        </up-grid>
      </view>

      <up-text
        text="时光隧道"
        color="#121212"
        size="20px"
        :block="flagTrue"
        :bold="flagTrue"
      ></up-text>

      <view class="na-box">
        <up-grid :border="false" col="3">
          <up-grid-item
            v-for="(listItem, listIndex) in navList"
            :key="listIndex"
            @click="navClick(listIndex)"
          >
            <up-icon :name="listItem.image" :size="22"></up-icon>
            <text class="grid-text">{{ listItem.title }}</text>
          </up-grid-item>
        </up-grid>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 初始化一个布尔值，用于后续逻辑判断
const flagTrue = true;

// 初始化一个空对象，用于存放输入框的样式
const inputStyle = {};

// 使用ref创建一个响应式字符串，用于搜索关键字的输入
const keyword = ref("");

// 使用ref创建一个响应式数组，包含标签列表
const tagList = ref([
  {
    title: "旅行",
  },
  {
    title: "生活",
  },
  {
    title: "纪念",
  },
  {
    title: "爱的碎片",
  },
  {
    title: "相伴",
  },
]);

// 使用ref创建一个响应式整数，用于记录当前选中的标签索引
const currentTagIndex = ref(0);

/**
 * 点击标签时触发的函数
 * @param {number} index - 被点击标签的索引
 */
const tagClick = (index: number) => {
  currentTagIndex.value = index;
};

// 使用ref创建一个响应式数组，包含导航列表
const navList = ref([
  {
    title: "时光机",
    image: "/static/dhphoto.png",
    page: "/pages/wander/index",
  },
]);

/**
 * 点击导航项时触发的函数
 * @param {number} index - 被点击导航项的索引
 */
const navClick = (index: number) => {
  const info = navList.value[index];
  // 如果导航项没有页面链接，则显示提示信息
  if (!info.page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
      icon: "error",
    });
    return;
  }
  // 导航到对应的页面
  uni.navigateTo({
    url: info.page,
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  padding: 44px 0;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  .page-wrap__top {
    box-sizing: border-box;
    padding: 0 24px;
    ::v-deep .u-search__content {
      border-radius: 10px !important;
    }
  }
  .tag-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 30px 0;
    padding: 0 0 0 24px;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 100px;
      height: 40px;
      color: #aaaaaa;
      &.active {
        background-color: #0069ef;
        color: #ffffff;
        border-radius: 20px;
      }
    }
  }
  .card-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 30px 0;
    padding: 0 0 0 24px;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    .item {
      flex-shrink: 0;
      width: 250px;
      height: 232px;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 20px;
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 1px 1px 10px rgba($color: #ffffff, $alpha: 0.1);
      .image {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
  .page-wrap__bottom {
    padding: 0 24px 0;
    .na-box {
      margin: 20px 0;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 15px;
      ::v-deep .u-grid-item {
        height: 60px;
        .grid-text {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
