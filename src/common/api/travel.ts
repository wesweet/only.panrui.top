import { http, toast } from "@/uni_modules/uview-plus";

// 获取首页轮播图
export const getTravelDetail = (config: any) =>
  http.get("travel/detail", config);

// 获取列表
export const getTravelList = (config: any) =>
  http.get("travel/getTravelList", config);
