<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-12-22 22:55:43
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
      <up-search
        :inputStyle="inputStyle"
        placeholder="搜索你想去的世界"
        shape="square"
        :show-action="false"
        height="40"
        v-model="keyword"
        @change="search"
      ></up-search>
    </view>

    <view class="page-wrap__swiper">
      <up-swiper :list="bannerList" height="220" radius="0"></up-swiper>
    </view>

    <view class="page-wrap__menu">
      <up-grid :border="false" col="4">
        <up-grid-item
          v-for="(listItem, listIndex) in navList"
          :key="listIndex"
          @click="navClick(listIndex)"
        >
          <!-- <up-image
            :src="listItem.image"
            width="30px"
            height="30px"
            radius="10"
          ></up-image>
          <view style="height: 10px"></view> -->
          <up-text align="center" :text="listItem.title" size="14"></up-text>
        </up-grid-item>
      </up-grid>
    </view>

    <view class="page-wrap__recommend">
      <up-text text="为您推荐" :bold="bold" size="18"></up-text>
      <view class="recommend-list">
        <view
          class="recommend-list-item"
          v-for="(item, index) in travelList"
          :key="index"
        >
          <up-image
            :show-loading="true"
            :src="item.photos"
            width="90px"
            height="90px"
            radius="10"
          ></up-image>
          <view class="item-right">
            <view style="flex: 1">
              <up-text :text="item.theme" :bold="bold" size="18"></up-text>
              <up-text
                :text="item.content"
                :lines="2"
                size="14"
                style="margin-top: 10px"
              ></up-text>
            </view>
            <up-text
              :text="item.updateDate"
              size="12"
              lineHeight="20"
            ></up-text>
          </view>
        </view>
      </view>
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

    <view class="page-wrap__bottomTip">
      <up-divider text="已经到底部，别再滑了"></up-divider>
      <view class="tip-box"> 恋爱长跑：{{ lovetime }} </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useTagStore } from "@/stores/tag";
import dayjs from "dayjs";
import { getTravelDetail, getTravelList } from "@/common/api/travel";
import { onLoad } from "@dcloudio/uni-app";
import { route, toast } from "@/uni_modules/uview-plus";

const tagStore = useTagStore();
// tagStore.getTagList();

const bannerList: any = ref([]);

const bold = true;

// 获取旅行列表
const travelList: any = ref([]);

onLoad(() => {
  getTravelDetail({})
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0) {
        toast(errorMessage);
        return;
      }
      if (data && data.photos && data.photos.length > 0) {
        bannerList.value = data.photos.map((item: { url: any }) => item.url);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });

  getTravelList({
    params: {
      page: 1,
      limit: 5,
    },
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0) {
        toast(errorMessage);
        return;
      }
      travelList.value = data.list.map((item: any) => {
        return {
          ...item,
          updateDate: dayjs(item.updateDate).format("YYYY-MM-DD HH:mm:ss"),
          photos: item.photos.length ? item.photos[0].url : "",
        };
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
});

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

// 使用ref创建一个响应式字符串，用于搜索关键字的输入
const keyword = ref("");

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
  {
    title: "时光机",
    image: "/static/images/dhphoto.png",
    page: "/pages/wander/index",
  },
  {
    title: "音乐",
    image: "/static/images/dhphoto.png",
    page: "/pages/music/index",
  },
  {
    title: "文档",
    image: "/static/dhphoto.png",
    page: "/pages/webview/wendang",
  },
  // {
  //   title: "账号",
  //   image: "/static/dhphoto.png",
  //   page: "/pages/account/index",
  // },
  {
    title: "网站",
    image: "/static/images/dhphoto.png",
    page: "/pages/website/index",
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
      // uni.navigateTo({
      //   url: "/pages/wander/index",
      // });
      break;
    case "音乐世界":
      // uni.navigateTo({
      //   url: "/pages/music/index",
      // });
      break;
    case "账号世界":
      // uni.navigateTo({
      //   url: "/pages/account/index",
      // });
      break;
    case "网站世界":
      // uni.navigateTo({
      //   url: "/pages/website/index",
      // });
      break;
    default:
      break;
  }
};

// 计算恋爱长跑时间
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
.page-wrap {
  background-color: #eee;
  .page-wrap__top {
    padding: 20px 24px;
    box-sizing: border-box;
    background-color: #fff;
    ::v-deep .u-search {
      // box-shadow: 0px 16px 30px rgba(0, 0, 0, 0.09),
      //   0px -4px 27px rgba(63, 63, 63, 0.06);
      border-radius: 100px !important;
      .u-search__content {
        border-radius: 100px !important;
      }
    }
  }

  .page-wrap__swiper {
    margin-bottom: 2px;
  }

  .page-wrap__menu {
    padding: 30px 12px;
    background-color: #fff;
    margin-top: 2px;
    box-sizing: border-box;
  }

  .page-wrap__recommend {
    padding: 10px 12px;
    background-color: #fff;
    margin-top: 4px;
    box-sizing: border-box;
    .recommend-list {
      .recommend-list-item {
        display: flex;
        padding: 15px 0;
        .item-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          margin-left: 10px;
        }
        ::v-deep .u-text {
          flex: 0;
        }
      }
    }
  }

  .page-wrap__bottomTip {
    padding: 10px 0;
    background-color: #fff;
    // margin-top: 4px;
    box-sizing: border-box;
    .tip-box {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #000;
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
