import { http, toast } from "@/uni_modules/uview-plus";

// 获取首页轮播图
export const getTravelDetail = (params: any) =>
  http.get("travel/detail", { params });
