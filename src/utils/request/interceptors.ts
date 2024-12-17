import { http, toast } from "@/uni_modules/uview-plus";

const getToken = () => {
  return uni.getStorageSync("token");
};

const requestInterceptors = (vm: any) => {
  /**
   * 请求拦截
   * @param {Object} http
   */
  http.interceptors.request.use(
    (config: { data: {} }) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      console.log("请求拦截器", config);
      config.data = config.data || {};
      // console.log(store.state);
      // console.log(config)
      return config;
    },
    (
      config: any // 可使用async await 做异步操作
    ) => Promise.reject(config)
  );
};

const responseInterceptors = (vm: any) => {
  /**
   * 响应拦截
   * @param {Object} http
   */
  http.interceptors.response.use(
    (response: any) => {
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      console.log("响应拦截器", response);
      const data = response.data;
      // 自定义参数
      const custom = response.config?.custom;
      if (response.statusCode !== 200) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (custom.toast !== false) {
          toast(response.errMsg);
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data);
        } else {
          // 否则返回一个pending中的promise
          return new Promise(() => {});
        }
      }
      return data || {};
    },
    (response: any) => {
      /*  对响应错误做点什么 （statusCode !== 200）*/
      console.log("response error", response);
      toast(response.errMsg);
      return Promise.reject(response);
    }
  );
};

export { requestInterceptors, responseInterceptors };
