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
    <view class="meeting-list">
      <view class="scroll-view-box">
        <scroll-view
          class="scroll-view"
          scroll-y="true"
          @scrolltolower="handScrolltolower"
          @scrolltoupper="handScrolltoupper"
        >
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const back = () => {
  uni.switchTab({ url: "/pages/tabPage/find" });
};
const handScrolltolower = () => {};

const handScrolltoupper = () => {};
</script>
