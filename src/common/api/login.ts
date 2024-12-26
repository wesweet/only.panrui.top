import { http, toast } from "@/uni_modules/uview-plus";

// 登录接口
export const login = (params: any, config = {}) =>
  http.post("login", params, config);

// 获取用户信息
export const getUserInfo = (opt: any) =>
  http.get("user/info", opt);

// 退出登录
export const logout = (params: any, config = {}) =>
  http.post("logout", params, config);
