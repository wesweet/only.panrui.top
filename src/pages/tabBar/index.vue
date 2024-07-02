<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-02 11:38:37
 * @FilePath: \only.panrui.top\src\pages\tabbar\index.vue
-->
<template>
  <prstatus></prstatus>
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
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const flagTrue = true;
// const flagFalse = false;
const inputStyle = {};
const keyword = ref(""); // 搜素关键词
const tagList = ref([
  {
    title: "相遇",
  },
  {
    title: "相知",
  },
  {
    title: "相爱",
  },
  {
    title: "相守",
  },
  {
    title: "相伴",
  },
]);
const currentTagIndex = ref(0);
const tagClick = (index: number) => {
  currentTagIndex.value = index;
};

const navList = ref([
  {
    title: "时光机",
    image: "/static/dhphoto.png",
    page: "/pages/wander/index",
  },
  {
    title: "时光机",
    image: "/static/dhphoto.png",
  },
  {
    title: "时光机",
    image: "/static/dhphoto.png",
  },
  {
    title: "时光机",
    image: "/static/dhphoto.png",
  },
  {
    title: "时光机",
    image: "/static/dhphoto.png",
  },
]);

const navClick = (index: number) => {
  const info = navList.value[index];
  if (!info.page) {
    uni.showToast({
      title: "功能正在开发中",
      duration: 2000,
      icon: "error",
    });
    return;
  }
  uni.navigateTo({
    url: info.page,
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  .page-wrap__top {
    padding: 50px 24px 0;
    ::v-deep .u-search__content {
      border-radius: 10px !important;
    }
  }
  .tag-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 30px 24px;
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
      &:last-child {
        margin-right: 30px;
      }
    }
  }
  .card-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 30px 24px;
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
      margin-top: 20px;
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
