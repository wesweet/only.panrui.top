/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-01 14:04:49
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-01 15:33:32
 * @FilePath: \only.panrui.top\src\store\tabBar\index.ts
 */

import { defineStore } from "pinia";

export const useTabBarStore = defineStore("tabBar", {
  state: () => {
    return {
      tabBarList: [
        {
          name: "首页",
          path: "pages/tabBar/index",
          iconPath: "static/home.png",
          selectedIconPath: "static/home.png",
          isActive: true,
        },
        {
          name: "工具",
          path: "pages/tabBar/tool",
          iconPath: "static/find.png",
          selectedIconPath: "static/find.png",
          isActive: false,
        },
        {
          name: "我的",
          path: "pages/tabBar/user",
          iconPath: "static/user.png",
          selectedIconPath: "static/user.png",
          isActive: false,
        },
      ],
      tabBarIndex: 0,
    };
  },
  getters: {
    getTabBarIndex(state) {
      return state.tabBarIndex;
    },
  },
  actions: {
    setTabBarIndex(index: number) {
      this.tabBarIndex = index;
    },
  },
});
