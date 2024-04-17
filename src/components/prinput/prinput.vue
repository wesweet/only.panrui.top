<!--
 * @Description: 
 * @Author: prui
 * @Date: 2024-04-17 19:52:53
 * @LastEditTime: 2024-04-17 19:56:03
 * @LastEditors: prui
 * 不忘初心,不负梦想
-->
<template>
  <view class="main-list oBorder">
    <input class="main-input" :placeholder="placeholder" />
  </view>
</template>

<script lang="ts" setup>
// 定义proops
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入内容'
    }
})

</script>

<style lang="scss" scoped>
.main-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* height: 36rpx; */ /* Input 高度 */
  color: #333333;
  padding: 40rpx 32rpx;
  margin: 32rpx 0;
  .main-input {
    flex: 1;
    text-align: left;
    font-size: 28rpx;
    /* line-height: 100rpx; */
    padding-right: 10rpx;
    margin-left: 20rpx;
  }
}
.oBorder {
  border: none;
  border-radius: 2.5rem;
  -webkit-box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);
  box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);
}
</style>
