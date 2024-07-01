<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 10:38:45
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-01 15:41:21
 * @FilePath: \only.panrui.top\src\pages\tabbar\index.vue
-->
<template>
  <view>11111</view>
  <up-tabbar :fixed="true" :placeholder="false" :safeAreaInsetBottom="false">
    <up-tabbar-item
      v-for="(item, index) in tabBarStore.tabBarList"
      text="首页"
      icon="home"
    ></up-tabbar-item>
  </up-tabbar>
</template>

<script lang="ts" setup>
import { useTabBarStore } from "@/stores/tabBar";
const tabBarStore = useTabBarStore();
console.log(tabBarStore);
</script>

<style lang="scss" scoped></style>
