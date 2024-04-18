<template>
  <view class="page">
    <prstatus></prstatus>
    <view class="wander-list">
      <template v-for="(item, index) in wanderList">
        <uni-section :title="item.title + '(' + item.date + ')'" type="line">
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
            <!-- <view slot="actions" class="card-actions">
              <view class="card-actions-item" @click="actionsClick('分享')">
                <uni-icons type="redo" size="18" color="#999"></uni-icons>
                <text class="card-actions-item-text">分享</text>
              </view>
              <view class="card-actions-item" @click="actionsClick('点赞')">
                <uni-icons type="heart" size="18" color="#999"></uni-icons>
                <text class="card-actions-item-text">点赞</text>
              </view>
              <view class="card-actions-item" @click="actionsClick('评论')">
                <uni-icons type="comment" size="18" color="#999"></uni-icons>
                <text class="card-actions-item-text">评论</text>
              </view>
            </view> -->
          </uni-card>
        </uni-section>
      </template>
    </view>
    <view class="icon-add" @click="addWander"> </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { request } from "@/utils/request";
import { appApi } from "@/api/app";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

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
        uni.showToast({
          title: errorMessage,
          duration: 2000,
        });
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
      duration: 2000,
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
