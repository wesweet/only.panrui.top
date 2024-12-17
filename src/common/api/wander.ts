import { http, toast } from "@/uni_modules/uview-plus";

// 流浪列表接口
export const getWanderList = (params: any) =>
  http.get("wander/getWanderList", { params });

// 流浪详情接口
export const getWanderDetail = (params: any) =>
  http.get("wander/getWanderDetail", { params });

// 保存流浪信息接口
export const saveWander = (params: any, config = {}) =>
  http.post("wander/saveWander", params, config);
