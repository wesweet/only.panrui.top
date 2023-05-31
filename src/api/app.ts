/*
 * @Description:
 * @Author: panrui
 * @Date: 2023-05-25 15:24:31
 * @LastEditTime: 2023-05-30 14:43:08
 * @LastEditors: panrui
 * 不忘初心,不负梦想
 */
import request from "@/utils/request";

// 登录
export function fetchLogin(data: any) {
  return request?.post?.("/app/login", data, { noAuth: true });
}

// 注册
export function fetchRegister(data: any) {
  return request?.post?.("/app/register", data, { noAuth: true });
}

// 退出登录
export function fetchLogout(data: any) {
  return request?.post?.("/app/logout", data);
}

// 获取用户信息
export function fetchUserInfo(data: any) {
  return request?.post?.("/app/userInfo", data);
}
