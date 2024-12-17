<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-17 17:26:19
 * @FilePath: 首页
-->
<template>
  <up-navbar
    title=""
    leftIcon=""
    :autoBack="false"
    :placeholder="true"
  ></up-navbar>
  <view class="page-wrap">
    <view class="page-wrap__top">
      <!-- <up-text
        text="你想去那里？"
        color="#121212"
        size="24px"
        :block="flagTrue"
        :bold="flagTrue"
      ></up-text> -->
      <!-- <view class="height20"></view> -->

      <!-- borderColor="#E7EAF0"
      bgColor="#FFFFFF" -->
      <up-search
        :inputStyle="inputStyle"
        placeholder="搜索你想去的世界"
        shape="square"
        :show-action="false"
        height="40"
        bgColor="#FFFFFF"
        v-model="keyword"
        @change="search"
      ></up-search>
    </view>

    <!-- <view class="tag-box">
      <view
        class="item"
        :class="{ active: index == currentTagIndex }"
        v-for="(item, index) in tagList"
        @click="tagClick(index, item)"
        :key="index"
      >
        {{ item.name }}
      </view>
    </view> -->

    <!-- <view class="card-box">
      <view
        class="item"
        v-for="(item, index) in travelList"
        @click="cardClick(item)"
      >
        <up-image
          class="image"
          width="100%"
          height="150"
          radius="20"
          :src="item.photos[0].url"
        ></up-image>
      </view>
    </view> -->

    <!-- <view class="tool-box">
      <up-text text="那年今日" size="18" color="#121212" :bold="bold"></up-text>
    </view> -->

    <!-- <view style="height: 200px"></view> -->

    <!-- <up-divider text="已经到底部，别再滑了"></up-divider> -->

    <!-- <view class="tip-box"> 恋爱长跑：{{ lovetime }} </view> -->

    <!-- #ifdef APP-PLUS -->
    <view class="page-wrap__bottom">
      <up-text
        text="潘潘的工具箱"
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
            <text class="grid-text">{{ listItem.title }}</text>
          </up-grid-item>
        </up-grid>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { request } from "@/utils/request";
import { TAG_API } from "@/api/tag";
import { TRAVEL_API } from "@/api/travel";
import { useTagStore } from "@/stores/tag";
import dayjs from "dayjs";
import { getTravelDetail } from "@/common/api/travel";

const tagStore = useTagStore();
// tagStore.getTagList();

// 页面加载完成

const tagList: any = computed(() => {
  return tagStore.tags.filter((item: any) => {
    return item.useType === "唯一";
  });
});

watch(tagList, (newVal: any) => {
  if (newVal.length) {
    getTravelList(newVal[0].id);
  }
});

// 初始化一个布尔值，用于后续逻辑判断
const flagTrue = true;

// 初始化一个空对象，用于存放输入框的样式
const inputStyle = {};
const bold = true;

// 使用ref创建一个响应式字符串，用于搜索关键字的输入
const keyword = ref("");

// 获取旅行列表
const travelList: any = ref([]);
const getTravelList = (id: string | number) => {
  travelList.value = [];
  request(TRAVEL_API.getTravelList, {
    method: "GET",
    data: {
      tag: id,
    },
  }).then((res: any) => {
    const { errorCode, errorMessage, data } = res;
    if (errorCode != 0) {
      uni.showToast({
        title: errorMessage,
        duration: 2000,
        icon: "error",
      });
    }
    if (data && data.list && data.list.length > 0) {
      travelList.value = data.list;
    } else {
      uni.showToast({
        title: "暂无内容",
        duration: 2000,
      });
    }
  });
};

// 使用ref创建一个响应式整数，用于记录当前选中的标签索引
const currentTagIndex = ref(0);

/**
 * 点击标签时触发的函数
 * @param {number} index - 被点击标签的索引
 */
const tagClick = (index: number, item: any) => {
  currentTagIndex.value = index;
  getTravelList(item.id);
};

// 使用ref创建一个响应式数组，包含导航列表
const navList = ref([
  // {
  //   title: "文档",
  //   image: "/static/dhphoto.png",
  //   page: "/pages/webview/wendang",
  // },
  {
    title: "账号",
    image: "/static/dhphoto.png",
    page: "/pages/account/index",
  },
  {
    title: "网站",
    image: "/static/dhphoto.png",
    page: "/pages/website/index",
  },
  {
    title: "音乐",
    image: "/static/dhphoto.png",
    page: "/pages/music/index",
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

/**
 * 点击卡片时触发的函数
 */
const cardClick = (item: any) => {
  uni.setStorageSync("photos", item.photos);
  // uni.showToast({
  //   title: "功能即将上线",
  //   icon: "none",
  // });
  uni.navigateTo({
    url: "/pages/travel/index",
  });
};

const search = () => {
  switch (keyword.value) {
    case "我爱丁晗":
    case "我爱潘潘":
      uni.navigateTo({
        url: "/pages/wander/index",
      });
      break;
    case "音乐世界":
      uni.navigateTo({
        url: "/pages/music/index",
      });
      break;
    case "账号世界":
      uni.navigateTo({
        url: "/pages/account/index",
      });
      break;
    case "网站世界":
      uni.navigateTo({
        url: "/pages/website/index",
      });
      break;
    default:
      break;
  }
};

const pastDateStr = "2023-10-04";
const lovetime = ref("");

const pollSince = (pastDateStr: any) => {
  const pastDate = dayjs(pastDateStr);

  function loop() {
    const currentDate = dayjs();
    const years = currentDate.diff(pastDate, "year");
    const months = currentDate.diff(pastDate.add(years, "year"), "month");
    const days = currentDate.diff(
      pastDate.add(years, "year").add(months, "month"),
      "day"
    );
    const hours = currentDate.diff(
      pastDate.add(years, "year").add(months, "month").add(days, "day"),
      "hour"
    );
    const minutes = currentDate.diff(
      pastDate
        .add(years, "year")
        .add(months, "month")
        .add(days, "day")
        .add(hours, "hour"),
      "minute"
    );
    const seconds = currentDate.diff(
      pastDate
        .add(years, "year")
        .add(months, "month")
        .add(days, "day")
        .add(hours, "hour")
        .add(minutes, "minute"),
      "second"
    );
    lovetime.value = `${years}年${months}月${days}日${hours}时${minutes}分${seconds}秒`;
  }
  // 设置定时器，每秒执行一次
  const intervalId = setInterval(loop, 1000);
};
pollSince(pastDateStr);
</script>

<style lang="scss" scoped>
// body,
// uni-page-body {
//   height: 100%;
// }

.page-wrap {
  .page-wrap__top {
    padding: 20px 24px;
    box-sizing: border-box;
    ::v-deep .u-search {
      box-shadow: 0px 16px 30px rgba(0, 0, 0, 0.09),
        0px -4px 27px rgba(63, 63, 63, 0.06);
      border-radius: 100px !important;
      .u-search__content {
        border-radius: 100px !important;
      }
    }
  }

  .tag-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 20px 0;
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
        background-color: #121212;
        color: #ffffff;
        border-radius: 20px;
      }
    }
  }

  .card-box {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 20px 0;
    padding: 0 0 0 24px;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;

    .item {
      flex-shrink: 0;
      width: 250px;
      height: 170px;
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

  .tool-box {
    margin: 20px 0;
    padding: 0 24px;
  }

  .tip-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    font-size: 12px;
    color: #000;
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
        height: 40px;

        .grid-text {
          margin-top: 5px;
          font-size: 16px;
        }
      }
    }
  }

  .height20 {
    height: 20px;
  }
}
</style>
