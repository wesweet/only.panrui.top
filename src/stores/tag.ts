/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-23 15:03:42
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-23 15:03:45
 * @FilePath: \only.panrui.top\src\stores\tag.ts
 * @Description: 标签管理器
 */

import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { TAG_API } from "@/api/tag";

export const useTagStore = defineStore("tag", {
  state: () => {
    return {
      tags: [],
    };
  },
  actions: {
    async getTagList() {
      const res: any = await request(TAG_API.getTagList, {
        method: "GET",
        data: {
          page: 1,
          limit: 100,
        },
      });
      const { errorCode, errorMessage, data } = res;
      if (errorCode == 0) {
        this.tags = data;
      }
    },
  },
});
