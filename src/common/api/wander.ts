import { http, toast } from "@/uni_modules/uview-plus";

// 流浪列表接口
export const getWanderList = (params: any) =>
  http.get("wander/getWanderList", { params });

// 流浪详情接口
export const getWanderDetail = (params: any) =>
  http.get("wander/getWanderDetail", { params });

// 保存流浪信息接口不带照片
export const saveWanderNoPhoto = (params: any, config = {}) =>
  http.post("wander/saveWanderNoPhoto", params, config);

// 流浪信息接口带照片
export const saveWander = (config: any) =>
  http.upload("wander/saveWander", config);
