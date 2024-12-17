// 引入配置
import config from "@/common/config";
// 引入拦截器配置
import { requestInterceptors, responseInterceptors } from "./interceptors";
// 引入luch-request
import { http } from "@/uni_modules/uview-plus";

const getToken = () => {
  return uni.getStorageSync("token");
};
//  初始化请求配置
const initRequest = (vm: any) => {
  http.setConfig((defaultConfig: { baseURL: string }) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = config.baseUrl; /* 根域名 */
    return defaultConfig;
  });
  requestInterceptors(vm);
  responseInterceptors(vm);
};
export { initRequest };
