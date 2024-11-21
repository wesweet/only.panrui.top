/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-10 14:51:23
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-17 10:56:08
 * @FilePath: \only.panrui.top\src\api\wander.ts
 * @Description: wander模块接口
 */
import { NEST_API_URL } from "@/config/app";
export const WANDER_API = {
  getWanderList: `${NEST_API_URL}/wander/getWanderList`,
  getWanderDetail: `${NEST_API_URL}/wander/getWanderDetail`,
  saveWander: `${NEST_API_URL}/wander/saveWander`,
  saveWanderWx: `${NEST_API_URL}/wander/saveWanderWx`,
};
