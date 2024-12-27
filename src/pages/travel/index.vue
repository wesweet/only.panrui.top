<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-17 16:40:24
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-27 15:44:41
 * @FilePath: \only.panrui.top\src\pages\travel\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <up-navbar title="旅行日记" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="page-wrap__list">
      <view class="page-wrap__listItem" v-for="(item, index) in travelList">
        <template v-if="item.photos.length">
          <up-swiper
            :list="item.photos"
            keyName="url"
            height="220"
            radius="0"
            indicator
            indicatorMode="line"
            circular
            :autoplay="false"
          ></up-swiper>
        </template>
        <view class="card">
          <up-text
            :text="item.theme"
            :bold="bold"
            size="16"
            color="#000"
          ></up-text>
          <view class="status">
            <up-icon name="map-fill"></up-icon>
            <up-text :text="item.place" size="12" color="#6B7280"></up-text>
            <up-icon name="calendar-fill"></up-icon>
            <up-text
              :text="item.updateDate"
              size="12"
              color="#6B7280"
            ></up-text>
          </view>
          <up-text :text="item.content" size="14" color="#4B5563"></up-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { route, toast } from "@/uni_modules/uview-plus";
import { getTravelList } from "@/common/api/travel";
import { onLoad } from "@dcloudio/uni-app";
import { ref, computed, watch, reactive } from "vue";
import dayjs from "dayjs";
import {
  onPullDownRefresh,
  onReachBottom,
  onShow,
  onPageScroll,
} from "@dcloudio/uni-app";

const bold = true;
const back = () => {
  route({
    type: "switchTab",
    url: "/pages/tabBar/user",
  });
};

const pagination = reactive({
  page: 1,
  limit: 5,
});

// 获取旅行列表
const travelList: any = ref([]);
let total = ref(0);
onLoad(() => {
  fetchGetTravelList();
});

const fetchGetTravelList = () => {
  getTravelList({
    params: pagination,
  }).then((res: any) => {
    const { errorCode, errorMessage, data } = res;
    if (errorCode != 0) {
      toast(errorMessage);
      return;
    }
    travelList.value = travelList.value.concat(
      data.list.map((item: any) => {
        return {
          ...item,
          place: item.place || "杭州",
          updateDate: dayjs(item.updateDate).format("YYYY-MM-DD"),
        };
      })
    );
    total.value = data.total;
  });
};

onPullDownRefresh(() => {
  pagination.page = 1;
  travelList.value = [];
  fetchGetTravelList();
  uni.stopPullDownRefresh();
});

onReachBottom(() => {
  if (pagination.page * pagination.limit >= total.value) {
    toast('没有更多数据了')
    return;
  }
  pagination.page++;
  fetchGetTravelList();
});
</script>

<style lang="scss" scoped>
.page-wrap {
  position: relative;
  padding-top: calc(var(--status-bar-height) + 70px);
  background-color: #f9fafb;
  .page-wrap__list {
    padding: 0 14px;
    box-sizing: border-box;
    .page-wrap__listItem {
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      .card {
        padding: 14px;
        .status {
          display: flex;
          align-items: center;
          margin: 10px 0;
          ::v-deep .u-text {
            flex: none!important;
            margin-left: 5px!important;
            width: auto!important;
          }
        }
      }
    }
  }
}
</style>
