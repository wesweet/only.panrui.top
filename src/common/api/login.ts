/*
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-12-17 15:41:37
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-12-27 14:39:45
 * @FilePath: \only.panrui.top\src\common\api\login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http, toast } from "@/uni_modules/uview-plus";

// 登录接口
export const login = (params: any, config = {}) =>
  http.post("login", params, config);

// 获取用户信息
export const getUserInfo = (config: any) =>
  http.get("user/info", config);

// 退出登录
export const logout = (params: any, config = {}) =>
  http.post("logout", params, config);
