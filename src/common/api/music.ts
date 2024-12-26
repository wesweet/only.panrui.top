import { http, toast } from "@/uni_modules/uview-plus";

// 查询音乐
export const searchMusic = (params: any) =>
  http.get("music/search", { params });