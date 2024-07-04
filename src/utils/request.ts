const checkRequestValidity = (url: string) => {
  if (!url) {
    throw new Error("请求地址不能为空");
  }
};

const autoLoginIfRequired = (options: any) => {};

const getToken = () => {
  return uni.getStorageSync("token");
};

export const request = (url: string, options: any) => {
  options = Object.assign(
    {
      method: "GET",
      data: {},
      header: {},
    },
    options
  );

  checkRequestValidity(url);

  autoLoginIfRequired(options);

  const token = getToken();
  if (token) {
    options.header.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
    let option: any = {
      url: url,
      method: options.method || "GET",
      data: options.data,
      header: Object.assign(
        {},
        {
          "Content-Type": "application/json",
        },
        options.header
      ),
      success: (response: any) => {
        uni.hideLoading();
        const { statusCode, data, errMsg } = response;
        if (statusCode == 200) {
          resolve(data);
        } else {
          uni.showToast({
            title: errMsg,
            duration: 2000,
            icon: "error",
          });
          reject(data);
        }
      },
      fail: (error: any) => {
        uni.hideLoading();
        reject(error);
      },
      complete: () => {
        uni.hideLoading();
      },
    };
    // #ifdef APP-PLUS
    option.sslVerify = false;
    // option.enableHttp2 = true;
    // #endif
    uni.request(option);
  });
};

// type RequestOptionsMethod =
//   | "OPTIONS"
//   | "GET"
//   | "HEAD"
//   | "POST"
//   | "PUT"
//   | "DELETE"
//   | "TRACE"
//   | "CONNECT";
// type RequestOptionsMethodAll =
//   | RequestOptionsMethod
//   | Lowercase<RequestOptionsMethod>;

// const requestOptions: RequestOptionsMethodAll[] = [
//   "options",
//   "get",
//   "post",
//   "put",
//   "head",
//   "delete",
//   "trace",
//   "connect",
// ];
// type Methods = typeof requestOptions[number];
// const request: { [key in Methods]?: Function } = {};

// /**
//  * 基础请求函数
//  * @param url 请求的URL地址
//  * @param method 请求方法
//  * @param data 请求的数据
//  * @param noAuth 是否禁用身份验证
//  * @param noVerify 是否禁用结果验证
//  * @param noLoading 是否禁用加载动画
//  * @param params 请求的参数
//  */
// function baseRequest(
//   url: string,
//   method: RequestOptionsMethod,
//   data: any,
//   { noAuth = false, noVerify = false, noLoading = false }: any,
//   params: any
// ) {
//   const ajaxdata = Object.assign({}, data); // 克隆data对象到ajaxdata对象
//   const token = uni.getStorageSync("token"); // 获取token
//   const Url = BaseUrl; // 请求的URL地址
//   let header = JSON.parse(JSON.stringify(HEADER)); // 复制HEADER对象到header对象
//   if (params != undefined) {
//     header = HEADERPARAMS; // 如果params不为空，则使用HEADERPARAMS对象
//   }
//   if (!noAuth && !token) {
//     // 如果token为空
//     return new Promise((reslove, reject) => {
//       uni.navigateTo({
//         url: "../login/login",
//       });
//     });
//   }
//   if (token && token !== "null") { // 如果token存在且不为null
//     ajaxdata.token = token; // 将token加入ajaxdata对象
//     header[TOKENNAME] = token; // 将token加入header对象
//   }
//   ajaxdata.time = Date.now(); // 将当前时间戳加入ajaxdata对象
//   return new Promise((reslove, reject) => {
//     if (!noLoading) {
//       uni.showLoading({
//         title: "加载中",
//         mask: true,
//       });
//     }
//     uni.request({
//       url: Url + url, // 请求的完整URL地址
//       method: method || "GET", // 请求的方法，默认为GET
//       header: header, // 请求的头部信息
//       data: ajaxdata || {}, // 请求的数据
//       success: (res: any) => {
//         console.log("接口成功返回值:", res);
//         if (!noLoading) {
//           uni.hideLoading();
//         }
//         if (noVerify) {
//           reslove(res.data);
//         } else if (res.statusCode === 200) {
//           reslove(res.data);
//         } else {
//           reject(res.data.message || "系统错误");
//         }
//       },
//       fail: (msg) => {
//         uni.hideLoading();
//         console.log("接口失败返回值:", msg);
//         reject("请求失败");
//       },
//     });
//   });
// }

// requestOptions.forEach((method) => {
//   const m = method as unknown as RequestOptionsMethod;
//   request[method] = (api: string, data: any, opt: any, params: any) =>
//     baseRequest(api, m, data, opt || {}, params);
// });

// export default request;
