import { http, toast } from "@/uni_modules/uview-plus";

// 登录接口
export const login = (params: any, config = {}) =>
  http.post("login", params, config);
