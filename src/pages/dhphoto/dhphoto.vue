<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 09:44:52
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-02 14:28:11
 * @FilePath: \only.panrui.top\src\pages\dhphoto\dhphoto.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="page">
    <prstatus></prstatus>
    <uni-nav-bar
      left-icon="left"
      shadow
      dark
      title="时光机"
      @clickLeft="back"
    />
    <view class="wander-list">
      <view class="scroll-view-box">
        <scroll-view class="scroll-view" scroll-y="true" @scrolltolower="handScrolltolower" @scrolltoupper="handScrolltoupper">
          <template v-for="(item, index) in wanderList">
            <uni-section
              :title="item.title + '(' + item.date + ')'"
              type="line"
            >
              <uni-card @click="onClick(item.id)">
                <image
                  v-show="item.photo"
                  slot="cover"
                  style="width: 100%"
                  :src="item.photo"
                  mode="widthFix"
                  @click.stop="previewImage(item.photo)"
                ></image>
                <text class="uni-body">{{ item.content }}</text>
              </uni-card>
            </uni-section>
          </template>
        </scroll-view>
      </view>
    </view>
    <view class="icon-add" @click="addWander"> </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

const back = () => {
  uni.navigateBack();
};

const onClick = (id: string) => {
  uni.navigateTo({
    url: "/pages/dhphoto/wander?id=" + id,
  });
};

const addWander = () => {
  // 跳转到新增流浪日记页面
  uni.navigateTo({
    url: "/pages/dhphoto/wander",
  });
};

const actionsClick = (value: string) => {
  console.log(value);
  uni.showToast({
    title: "功能正在开发中",
    duration: 2000,
  });
};

// 定义分页数据
const pagination = reactive({
  page: 1,
  limit: 10,
});

// 定义渲染数据
let total = ref(0);
// 定义数组中数据的接口
interface Wander {
  id: string;
  title: string;
  content: string;
  photo?: string;
  date: string;
}
// 定义显示的数据
const wanderList = ref<Wander[]>([]);
// 获取流浪列表
const getWanderList = () => {
  request(appApi.getWanderList, {
    method: "GET",
    data: pagination,
  })
    .then((res: any) => {
      const { errorCode, errorMessage, data } = res;
      if (errorCode == 0) {
        if (data) {
          wanderList.value = wanderList.value.concat(data.list);
          total.value = data.total;
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

// 执行获取流浪列表
getWanderList();

const handScrolltolower = () => {
  if (pagination.page * pagination.limit >= total.value) {
    uni.showToast({
      title: "没有更多数据了",
      duration: 2000,
    });
    return;
  }
  pagination.page++;
  getWanderList();
}

const handScrolltoupper = () => {
	pagination.page = 1;
	wanderList.value = [];
	getWanderList();
	uni.stopPullDownRefresh();
}

// 定义页面下拉刷新方法
onPullDownRefresh(() => {
  pagination.page = 1;
  wanderList.value = [];
  getWanderList();
  uni.stopPullDownRefresh();
});

onReachBottom(() => {
  if (pagination.page * pagination.limit >= total.value) {
    uni.showToast({
      title: "没有更多数据了",
      duration: 300,
    });
    return;
  }
  pagination.page++;
  getWanderList();
});

const previewImage = (photo: any) => {
  uni.previewImage({
    current: photo,
    urls: [photo],
  });
};
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.wander-list {
  flex: 1;
  padding: 8rpx;
  box-sizing: border-box;
  overflow: hidden;
  .scroll-view-box {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 60rpx;
    .scroll-view {
      height: 100%;
    }
  }
}
.icon-add {
  position: fixed;
  right: 20rpx;
  bottom: 50rpx;
  z-index: 100;
  background-image: url("~@/static/add.png");
  width: 100rpx;
  height: 100rpx;
  background-size: 100%;
}
.card-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
  .card-actions-item {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
  }
}
.wander-list {
  padding-bottom: 100rpx;
}
</style>
