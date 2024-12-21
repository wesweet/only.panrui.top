<!--
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-02 20:07:21
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-12-17 21:36:05
 * @FilePath: 流浪列表页面
-->
<template>
  <prstatus></prstatus>
  <up-navbar title="时光机" :autoBack="false" @leftClick="back"> </up-navbar>
  <view class="page-wrap">
    <view class="album-list">
      <view class="album" v-for="(item, index) in wanderList" :key="index">
        <view class="album__avatar" @click="toDetail(item.id)">
          <image
            src="/static/images/login.png"
            style="width: 24px; height: 24px"
          ></image>
        </view>
        <view class="album__content">
          <view @click="toDetail(item.id)">
            <up-text
              :text="item.title"
              bold
              size="17"
              color="#0a0a0a"
            ></up-text>
            <up-text margin="5px 0 15px 0" :text="item.content"></up-text>
          </view>
          <template v-if="item.urls && item.urls.length">
            <up-album
              :urls="item.urls"
              keyName="index"
              singleMode="aspectFit"
            ></up-album>
          </template>
          <up-text margin="10px 0 0 0" :text="item.date"></up-text>
        </view>
      </view>
    </view>
    <up-back-top :scroll-top="scrollTop"></up-back-top>
    <view class="icon-add" @click="toDetail('')">
      <up-icon name="plus" size="20" color="#909399"></up-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { route, toast } from "@/uni_modules/uview-plus";
import { getWanderList } from "@/common/api/wander";
import {
  onPullDownRefresh,
  onReachBottom,
  onShow,
  onPageScroll,
} from "@dcloudio/uni-app";

// 在应用显示时检查密码，如果正确则加载漫游列表


// 定义分页参数
const pagination = reactive({
  page: 1,
  limit: 10,
});
let total = ref(0);
// 定义漫游数据接口
interface Wander {
  id: string;
  title: string;
  content: string;
  photo?: string;
  date: string;
  urls?: string[];
}
const wanderList = ref<Wander[]>([]);

onShow(() => {
  // const wanderPassword = uni.getStorageSync("wanderPassword");
  // if (!wanderPassword) {
  //   uni.showModal({
  //     title: "校验",
  //     content: "请输入密钥进入",
  //     editable: true,
  //     success: function (res: any) {
  //       if (res.confirm) {
  //         if (res.content == 1111) {
  //           uni.setStorageSync("wanderPassword", 1111);
  //           getWanderList();
  //         } else {
  //           uni.showToast({
  //             title: "密码错误",
  //             duration: 2000,
  //             icon: "error",
  //             complete: () => {
  //               uni.switchTab({
  //                 url: "/pages/tabBar/index",
  //               });
  //             },
  //           });
  //         }
  //       } else if (res.cancel) {
  //         uni.switchTab({
  //           url: "/pages/tabBar/index",
  //         });
  //       }
  //     },
  //   });
  //   return;
  // }
  // if (wanderPassword === 1111 && total.value == 0) {
  // }
  // if (total.value == 0) {
  //   getWanderList();
  // }
  pagination.page = 1;
  wanderList.value = [];
  total.value = 0;
  fetchGetWanderList();
});


// 加载漫游列表数据
const fetchGetWanderList = () => {
  getWanderList(pagination)
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode != 0) {
        toast(errorMessage);
        return;
      }
      if (!data || (data && data.list.length == 0)) {
        toast("暂无更多内容");
        return;
      }
      for (let index = 0; index < data.list.length; index++) {
        const element = data.list[index];
        if (element.photo) {
          element.urls = [element.photo];
        }
      }
      wanderList.value = wanderList.value.concat(data.list);
      pagination.page++;
      total.value = data.total;
    })
    .catch((err: any) => {})
    .finally(() => {
      // uni.hideLoading();
    });
};
// const getWanderList = () => {
//   request(WANDER_API.getWanderList, {
//     method: "GET",
//     data: pagination,
//   })
//     .then((res: any) => {
//       const { errorCode, errorMessage, data } = res;
//       if (errorCode != 0) {
//         uni.showToast({
//           title: errorMessage,
//           duration: 500,
//           icon: "error",
//         });
//         return;
//       }
//       if (!data || (data && data.list.length == 0)) {
//         uni.showToast({
//           title: "暂无更多内容",
//           duration: 2000,
//           icon: "error",
//         });
//       }
//       for (let index = 0; index < data.list.length; index++) {
//         const element = data.list[index];
//         if (element.photo) {
//           element.urls = [element.photo];
//         }
//       }
//       wanderList.value = wanderList.value.concat(data.list);
//       total.value = data.total;
//     })
//     .catch((err: any) => {
//       console.log(err);
//     });
// };

// 下拉刷新时重置分页并加载漫游列表
onPullDownRefresh(() => {
  pagination.page = 1;
  wanderList.value = [];
  fetchGetWanderList();
  uni.stopPullDownRefresh();
});

// 上拉触底时加载更多漫游列表数据
onReachBottom(() => {
  if (pagination.page * pagination.limit >= total.value) {
    toast("没有更多数据了", 300);
    return;
  }
  fetchGetWanderList();
});

// 跳转到详情页面
const toDetail = (id: string) => {
  route({
    url: "/pages/wander/detail",
    params: { id },
  });
};

const scrollTop = ref(0);

// 监听页面滚动事件，更新滚动位置
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});

const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};
</script>

<style lang="scss" scoped>
.page-wrap {
  /* #ifdef H5 */
  padding: calc(var(--status-bar-height) + 50px) 24px 0;
  /* #endif */
  /* #ifdef APP-PLUS */
  padding: 50px 24px 0;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  padding: calc(var(--status-bar-height) + 50px) 24px 0;
  /* #endif */
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  min-height: 100%;
  box-sizing: border-box;
}
.album {
  @include flex;
  align-items: flex-start;
  margin-bottom: 20px;

  &__avatar {
    background-color: $u-bg-color;
    padding: 5px;
    border-radius: 3px;
  }

  &__content {
    margin-left: 15px;
    flex: 1;
  }
}

.icon-add {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  width: 40px;
  height: 40px;
  bottom: 30px;
  border-radius: 50%;
  background-color: #e1e1e1;
}
</style>
