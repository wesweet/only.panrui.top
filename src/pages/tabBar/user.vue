<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:58
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-08 16:23:35
 * @FilePath: \only.panrui.top\src\pages\tabBar\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <prstatus></prstatus>
  <view class="page-wrap">
    <view class="page-top">
      <view class="page-top__avatar">
        <up-avatar
          size="100"
          src="https://static.panrui.top/images/blog/gallery/file-169959676574915050522.jpg"
        ></up-avatar>
      </view>
      <view class="page-top__info">
        <up-text
          text="初心不負"
          align="center"
          :bold="bold"
          color="#020202"
          size="28"
        ></up-text>
        <up-text text="@panrui" align="center" size="18"></up-text>
      </view>
    </view>
    <view class="page-center">
      <view class="item">
        <up-text
          text="0"
          align="center"
          color="#121212"
          :bold="bold"
          size="22"
        ></up-text>
        <up-text text="收藏" align="center" color="#606060" size="14"></up-text>
      </view>
      <view class="item">
        <up-text
          text="0"
          align="center"
          color="#121212"
          :bold="bold"
          size="22"
        ></up-text>
        <up-text
          text="观看历史"
          align="center"
          color="#606060"
          size="14"
        ></up-text>
      </view>
      <view class="item">
        <up-text
          text="0"
          align="center"
          color="#121212"
          :bold="bold"
          size="22"
        ></up-text>
        <up-text text="下载" align="center" color="#606060" size="14"></up-text>
      </view>
    </view>
    <view class="page-bottom"></view>
  </view>
</template>

<script lang="ts" setup>
const bold = true;
</script>

<style lang="scss" scoped>
.page-wrap {
  padding: 44px 0 0;
  box-sizing: border-box;
  background-color: #f5f6f7;
  .page-top {
    .page-top__avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .page-top__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px 0 10px;
    }
  }
  .page-center {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 20px 34px;
    height: 77px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  }
  .page-bottom {
    // position: fixed;
    // left: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
    height: 450px;
    background-color: #fff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
}
</style>
