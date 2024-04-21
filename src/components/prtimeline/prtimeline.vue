<!--
 * @Description: 时间线组件
 * @Author: prui
 * @Date: 2024-04-21 12:33:51
 * @LastEditTime: 2024-04-21 12:44:54
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view class="el-timeline">
    <view
      v-for="(item, index) in props.list"
      :key="index"
      class="el-timeline-item"
    >
      <view class="el-timeline-item__tail"></view>
      <view
        class="el-timeline-item__node--normal el-timeline-item__node"
      ></view>
      <view class="el-timeline-item__wrapper">
        <view class="el-timeline-item__timestamp is-top">
          {{ item.meetingDate }}
        </view>
        <view class="el-timeline-item__content">
          <uni-card :is-shadow="true" is-full>
            <view class="uni-card-title">{{ item.activityDescription }}</view>
            <view class="uni-card-content">{{ item.notes }}</view>
          </uni-card>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface List {
  meetingDate: string;
  activityDescription: string;
  notes: string;
  id: number;
  location: string;
}
const props = defineProps({
  list: {
    type: Array as () => List[],
    default: () => [],
  },
});
</script>

<style lang="scss">
.el-timeline-item {
  position: relative;
  padding-bottom: 40rpx;
  .el-timeline-item__tail {
    position: absolute;
    left: 8rpx;
    height: 100%;
    border-left: 4rpx solid #e4e7ed;
  }
  .el-timeline-item__node--normal {
    left: -1px;
    width: 24rpx;
    height: 24rpx;
  }
  .el-timeline-item__node {
    position: absolute;
    background-color: #e4e7ed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-timeline-item__wrapper {
    position: relative;
    padding-left: 56rpx;
    top: -6rpx;
  }
  .el-timeline-item__timestamp {
    color: #909399;
    line-height: 1;
    font-size: 26rpx;
    &.is-top {
      margin-bottom: 16rpx;
      padding-top: 8rpx;
    }
  }
}
</style>
